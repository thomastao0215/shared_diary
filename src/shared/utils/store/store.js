import {
  toJS,
  action,
  autorun,
  comparer,
  computed,
  observable,
  extendObservable
} from 'mobx';
import get from '../get';
import { mapStore, mapState, mapGetters } from './helpers';

export function Store(options = {}) {
  var _this = this;
  this._reset();

  if (!(this instanceof Store)) {
    throw new TypeError('Cannot call a class as a function');
  }

  this.commit = function (type, payload) {
    if (!_this.mutations[type]) {
      return console.warn('[store] Unknown mutation type: ' + type);
    }

    return _this.mutations[type](payload);
  };

  this.dispatch = function (type, payload) {
    if (!_this.actions[type]) {
      return console.warn('[store] Unknown action type: ' + type);
    }

    return _this.actions[type](_this, payload);
  };

  this._initMobx();
  this.registerModule(options);
}

Store.prototype._reset = function () {
  this.actions = Object.create(null);
  this.getters = Object.create(null);
  this.mutations = Object.create(null);
  this.$mobx = null;
  this._watchers = [];
};

Store.prototype._initMobx = function () {
  this.$mobx = observable({ state: {} });
};

Store.prototype.registerModule = function registerModule(module = {}) {
  const _this = this;
  module.state && this.registerState(module.state);
  module.getters && this.registerGetters(module.getters);
  module.mutations && this.registerMutations(module.mutations);
  module.actions && this.registerActions(module.actions);

  if (typeof module.modules === 'object' && module.modules != null) {
    Object.keys(module.modules).forEach((key) => {
      _this.registerModule(module.modules[key]);
    });
  }
};

Store.prototype.registerState = function (state) {
  extendObservable(this.$mobx.state, state);
};

Store.prototype.registerGetters = function (getters = {}) {
  const _this = this;
  const options = Object.create(null);

  Object.keys(getters).forEach((key) => {
    Object.defineProperty(_this.getters, key, {
      get() {
        return toJS(_this.$mobx[key]);
      },
      set() {},
      enumerable: true
    });

    Object.defineProperty(options, key, {
      get() {
        return getters[key](_this.state, _this.getters);
      },
      enumerable: true
    });
  });

  extendObservable(this.$mobx, options);
};

Store.prototype.registerActions = function (actions) {
  Object.assign(this.actions, actions);
};

Store.prototype.registerMutations = function (mutations = {}) {
  const _this = this;
  const options = Object.create(null);
  const extra = Object.create(null);

  Object.keys(mutations).forEach((key) => {
    // 然后 this.mutations 调用的就是 mobx 中经过封装的函数
    _this.mutations[key] = function (...args) {
      const $mobx = _this.$mobx;
      return $mobx[key].call($mobx, ...args);
    };

    // 先将原函数经过封装, 托管给 mobx
    options[key] = function (payload) {
      mutations[key](this.state, payload);
    };
    extra[key] = action;
  });

  extendObservable(this.$mobx, options, extra);
};

Store.prototype.registerWatchers = function (context, watch = {}) {
  const _this = this;

  const watchers = Object.keys(watch).map(function (key) {
    let deep = false;
    let immediate = false;
    let handler = function handler() {};

    if (typeof watch[key] === 'function') {
      handler = watch[key];
    } else if (typeof watch[key] === 'object') {
      const watchObj = watch[key];
      deep = watchObj.deep;
      handler = watchObj.handler;
      immediate = watchObj.immediate;
    }

    const namespace = key.split('.')[0];
    const scope = namespace in this.$mobx.state ? _this.$mobx.state : _this.$mobx;

    const disposer = computed(() => {
      return toJS(get(scope, key));
    }, {
      equals: deep ? comparer.structural : comparer.default
    }).observe((change) => {
      setTimeout(() => {
        handler.call(context, change.newValue, change.oldValue);
      });
    });

    if (immediate) {
      const value = toJS(get(scope, key));
      handler.call(context, value);
    }

    return { context, disposer };
  });

  this._watchers = [].concat(this._watchers, watchers);
};

Store.prototype.install = function (context, options = {}) {
  const store = this;
  context.$store = store;
  context.$commit = store.commit;
  context.$dispatch = store.dispatch;

  const watch = options.watch || context.watch || {};

  this.registerWatchers(context, watch);

  this._watchers = [...this._watchers, { context, disposer: autorun(patch.bind(this, store, context, options)) }];
};

Store.prototype.uninstall = function (context) {
  this._watchers.filter(item => {
    return item.context === context;
  }).forEach(item => {
    item.disposer();
  });
  this._watchers = this._watchers.filter(item => {
    return item.context !== context;
  });

  if (this._watchers.length === 0) {
    this._reset();
  }
};

Object.defineProperty(Store.prototype, 'state', {
  configurable: true,
  enumerable: false,
  get() {
    return toJS(this.$mobx.state);
  }
});

function patch(store, context, options) {
  const storeKeys = options.mapStore || context.mapStore;
  const stateKeys = options.mapState || context.mapState;
  const getterKeys = options.mapGetters || context.mapGetters;
  const data = {
    ...mapStore.call(context, storeKeys),
    ...mapState.call(context, stateKeys),
    ...mapGetters.call(context, getterKeys)
  };
  const setData = context.setData;
  setData.call(context, data);
}
