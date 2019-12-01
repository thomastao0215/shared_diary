/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/class/index.js",
{

/***/ "./src/pages/class/index.js":
/*!**********************************!*\
  !*** ./src/pages/class/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 获取应用实例
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '/packages/example-base/index'
    });
  },

  onLoad() {
    const windowHeight = wx.getSystemInfoSync().windowHeight;
    wx.createSelectorQuery().select('.ipt-container').boundingClientRect(e => {
      this.setData({
        categoryHeight: windowHeight - e.height
      });
    }).exec();
  },

  getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }

});

/***/ })

/******/ });