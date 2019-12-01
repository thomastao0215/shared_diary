/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/success/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

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

const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad(query = {}) {
    const {
      isNext,
      orderId
    } = query;
    this.orderId = orderId;
    this.setData({
      isNext: !!isNext
    });
  },

  bindShare() {},

  onShareAppMessage() {
    let user = wx.getStorageSync('user');
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index?from_uid=' + user.id + '&from_uid_time=' + utils_util__WEBPACK_IMPORTED_MODULE_0__["default"].formatTime(new Date()),
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  },

  getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },

  onClick() {
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