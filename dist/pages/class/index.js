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
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '/packages/example-base/index'
    });
  },
  onLoad: function onLoad() {
    var _this = this;

    var windowHeight = wx.getSystemInfoSync().windowHeight;
    wx.createSelectorQuery().select('.ipt-container').boundingClientRect(function (e) {
      _this.setData({
        categoryHeight: windowHeight - e.height
      });
    }).exec();
  },
  getUserInfo: function getUserInfo(e) {
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