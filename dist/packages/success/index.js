/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/success/index.js",
Object.assign(require("././../commonchunks.js").modules, {

/***/ "./src/packages/success/index.js":
/*!***************************************!*\
  !*** ./src/packages/success/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/util */ "./src/utils/util.js");
 // index.js
// 获取应用实例

var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function onLoad(query) {
    if (query === void 0) {
      query = {};
    }

    var _query = query,
        isNext = _query.isNext,
        orderId = _query.orderId;
    this.orderId = orderId;
    this.setData({
      isNext: !!isNext
    });
  },
  bindShare: function bindShare() {},
  onShareAppMessage: function onShareAppMessage() {
    var user = wx.getStorageSync('user');
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index?from_uid=' + user.id + '&from_uid_time=' + utils_util__WEBPACK_IMPORTED_MODULE_0__["default"].formatTime(new Date()),
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  },
  getUserInfo: function getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onClick: function onClick() {
    if (this.data.isNext) {
      // 预约寄回
      wx.redirectTo({
        url: '/packages/back/index?id=' + this.orderId
      });
    } else {
      // 查看我的小盒
      wx.switchTab({
        url: '/pages/box/index'
      });
    }
  }
});

/***/ })

/******/ }));