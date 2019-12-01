function normalizeMap(map) {
  return Array.isArray(map) ? map.map((key) => {
    return { key, val: key };
  }) : Object.keys(map).map((key) => {
    return { key, val: map[key] };
  });
}

export const storeMixin = function (options = {}) {
  return Behavior({
    ready() {
      const pageList = getCurrentPages();
      const page = pageList[pageList.length - 1];
      const store = options.store || page.$store;
      if (store !== null) {
        store.install(this, options);
      }
    },
    detached() {
      this.$store && this.$store.uninstall(this);
    }
  });
};

export const mapState = function (options = {}) {
  const res = {};
  const state = this.$store.state;
  const getters = this.$store.getters;

  normalizeMap(options).forEach(item => {
    const { key, val } = item;
    res[key] = typeof val === 'function' ? val.call(this, state, getters) : state[val];
  });
  return res;
};

export const mapGetters = function (options = []) {
  const res = {};
  const getters = this.$store.getters;

  normalizeMap(options).forEach(item => {
    const { key, val } = item;
    res[key] = getters[val];
  });
  return res;
};

export const mapStore = function (options = []) {
  if (!Array.isArray(options)) {
    return {};
  }
  const { state, getters } = this.$store;
  const stateKeys = options.filter(key => Object.keys(state).indexOf(key) > -1);
  const getterKeys = options.filter(key => Object.keys(getters).indexOf(key) > -1);

  return {
    ...mapState.call(this, stateKeys),
    ...mapGetters.call(this, getterKeys)
  };
};
