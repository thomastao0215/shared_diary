/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/wallet/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

/***/ "./src/packages/wallet/index.js":
/*!**************************************!*\
  !*** ./src/packages/wallet/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/api */ "./src/utils/api.js");
/* harmony import */ var utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/util */ "./src/utils/util.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/packages/wallet/utils.js");




const isIphoneX = utils_util__WEBPACK_IMPORTED_MODULE_1__["default"].isIphoneX();
const app = getApp();
Page({
  data: {
    originCouponList: [],
    couponList: [],
    isIphoneX,
    fetchCode: ''
  },

  onLoad(query = {}) {
    this.init();

    if (query.select) {
      this.select = true;
    }
  },

  init() {
    this.fetchLock = false;
    vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"].loading('加载中...');
    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])(utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].coupon_list).then(res => {
      const couponList = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["filterFetchData"])(res.coupon_list);
      this.setData({
        couponList,
        fetchCode: '',
        originCouponList: res.coupon_list
      });
      vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"].clear();
    });
  },

  onFetchCodeInput(e) {
    this.setData({
      fetchCode: e.detail
    });
  },

  onClickFetchCoupon() {
    if (this.fetchLock) {
      return;
    }

    if (!this.data.fetchCode) {
      return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])('请输入兑换码');
    }

    this.fetchLock = true;
    vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"].loading('兑换中...');
    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])(utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].coupon_exchange, {
      code: this.data.fetchCode
    }).then(() => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])('兑换成功');
      this.init();
    }).catch(err => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])(err.message || err.msg || '兑换失败');
      this.fetchLock = false;
    });
  },

  onClickCoupon(e) {
    if (!this.select) {
      return;
    }

    const {
      index
    } = e.currentTarget.dataset;
    app.globalData.isSetCoupon = true;
    app.globalData.coupon = this.data.originCouponList[index];
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }

});

/***/ })

/******/ }));