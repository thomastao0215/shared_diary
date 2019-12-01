/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_lin-ui@0.6.12@lin-ui/dist/tabs/index.js",
{

/***/ "./node_modules/_lin-ui@0.6.12@lin-ui/dist/behaviors/scrollCenter.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_lin-ui@0.6.12@lin-ui/dist/behaviors/scrollCenter.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line no-undef
/* harmony default export */ __webpack_exports__["default"] = (Behavior({
  methods: {
    getRect(selector, all = false) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        const type = all ? query.selectAll(selector) : query.select(selector);
        type.boundingClientRect((res) => {
          if (!res) return reject('找不到元素');
          resolve(res);
        }).exec();
      });
    },
    queryScrollNode(res, currentIndex, type = 'width') {
      const currentRect = res[currentIndex];

      this.getRect('.l-tabsscroll').then(_ => {
        const scrollWidth = _[type];

        let transformDistance = res
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr[type], 0);

        transformDistance += (currentRect[type] - scrollWidth) / 2;

        if (type === 'width') {
          this.setData({
            transformX: transformDistance,
            transformY: 0
          });
        } else {
          this.setData({
            transformX: 0,
            transformY: transformDistance
          });
        }
      });
    },
    queryMultipleNodes() {
      const {
        placement,
        currentIndex
      } = this.data;
      this.getRect('.l-tabs-item', true)
        .then((res) => {
          if (['top', 'bottom'].indexOf(placement) !== -1) {
            this.queryScrollNode(res, currentIndex);
          } else {
            this.queryScrollNode(res, currentIndex, 'height');
          }
        });
    }
  }
}));

/***/ }),

/***/ "./node_modules/_lin-ui@0.6.12@lin-ui/dist/tabs/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/_lin-ui@0.6.12@lin-ui/dist/tabs/index.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _behaviors_scrollCenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../behaviors/scrollCenter */ "./node_modules/_lin-ui@0.6.12@lin-ui/dist/behaviors/scrollCenter.js");

Component({
  behaviors: [_behaviors_scrollCenter__WEBPACK_IMPORTED_MODULE_0__["default"]],
  externalClasses: [
    'l-class-tabs',
    'l-class-header',
    'l-class-active',
    'l-class-content',
    'l-class-inactive',
    'l-class-line',
    'l-class-tabimage',
    'l-class-header-line',
    'l-class-icon',
    'l-tabs-class',
    'l-header-class',
    'l-active-class',
    'l-content-class',
    'l-inactive-class',
    'l-line-class',
    'l-tabimage-class',
    'l-header-line-class',
    'l-icon-class'
  ],
  relations: {
    '../tabpanel/index': {
      type: 'child',
      linked() {
        // 每次有子节点被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        this.initTabs();
      },
      unlinked() {
        this.initTabs();
      }
    },

  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    activeKey: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    },
    placement: {
      type: String,
      value: 'top',
    },
    animated: Boolean,
    swipeable: Boolean,
    scrollable: Boolean,
    hasLine: {
      type: Boolean,
      value: true
    },
    animatedForLine: Boolean,
    activeColor: {
      type: String,
      value: '#333333'
    },
    inactiveColor: {
      type: String,
      value: '#bbbbbb'
    },
    equalWidth: {
      type: Boolean,
      value: true
    }

  },

  data: {
    tabList: [],
    currentIndex: 0,
    transformX: 0,
    transformY: 0,
  },

  ready() {
    this.initTabs();
  },


  /**
   * 组件的方法列表
   */
  methods: {
    initTabs(val = this.data.activeKey) {
      let items = this.getRelationNodes('../tabpanel/index');
      if (items.length > 0) {
        let activeKey = val,
          currentIndex = this.data.currentIndex;
        const tab = items.map((item, index) => {

          activeKey = !val && index == 0 ? item.data.key : activeKey;
          currentIndex = item.data.key === activeKey ? index : currentIndex;
          return {
            tab: item.data.tab,
            key: item.data.key,
            icon: item.data.icon,
            iconSize: item.data.iconSize,
            image: item.data.image,
            picPlacement: item.data.picPlacement,
          };
        });
        this.setData({
          tabList: tab,
          activeKey,
          currentIndex,
        }, () => {
          if (this.data.scrollable) {
            this.queryMultipleNodes();
          }
        });
      }
    },
    swiperChange(e) {
      const {
        source,
        current
      } = e.detail;
      if (source == 'touch') {
        const currentIndex = current;
        const activeKey = this.data.tabList[current].key;
        this._setChangeData({
          activeKey,
          currentIndex
        });
      }
    },
    handleChange(e) {
      const activeKey = e.currentTarget.dataset.key;
      const currentIndex = e.currentTarget.dataset.index;
      this._setChangeData({
        activeKey,
        currentIndex
      });
    },

    _setChangeData({
      activeKey,
      currentIndex
    }) {
      this.setData({
        activeKey,
        currentIndex
      }, () => {
        if (this.data.scrollable) {
          this.queryMultipleNodes();
        }
      });
      this.triggerEvent('linchange', {
        activeKey,
        currentIndex
      });
    }
  }
});

/***/ })

/******/ });