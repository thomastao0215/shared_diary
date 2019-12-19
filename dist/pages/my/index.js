/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/my/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./src/pages/my/index.js":
/*!*******************************!*\
  !*** ./src/pages/my/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js");
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! weapp-zx */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js");


Page({
  data: {
    userInfo: {
      nickName: '点击头像登陆'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    default_avatarUrl: 'https://cloud-minapp-25663.cloud.ifanrusercontent.com/1hEl1dExlftTcM6M.jpg',
    joinDate: 0
  },
  // 事件处理函数
  switchToBox: function switchToBox() {
    wx.switchTab({
      url: '../box/index'
    });
  },
  Subs: function Subs() {
    wx.setClipboardData({
      data: 'public_account',
      success: function success() {
        wx.getClipboardData({
          success: function success() {
            wx.hideToast({
              complete: function complete() {
                Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__["default"])('公众号已复制，前往微信顶部搜索框粘贴搜索');
              }
            });
          }
        });
      }
    });
  },
  onLoad: function onLoad() {
    // 获取 user 信息
    var userInfo = wx.BaaS.storage.get('userinfo');
    weapp_zx__WEBPACK_IMPORTED_MODULE_1__["default"].get('user', 'me').then(function (res) {
      console.log(res);
    });

    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
  },
  navToWallet: function navToWallet() {
    wx.navigateTo({
      url: '/packages/wallet/index'
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
  },
  navToBox: function navToBox() {
    wx.switchTab({
      url: '/pages/box/index'
    });
  },
  navToInvite: function navToInvite() {
    wx.navigateTo({
      url: '/packages/invite/index'
    });
  },
  navToAddress: function navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index'
    });
  },
  navToOrders: function navToOrders() {
    wx.navigateTo({
      url: '/packages/orders/index'
    });
  }
});

/***/ })

/******/ }));