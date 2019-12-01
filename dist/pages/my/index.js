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
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");
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
  switchToBox() {
    wx.switchTab({
      url: '../box/index'
    });
  },

  Subs() {
    wx.setClipboardData({
      data: 'public_account',

      success() {
        wx.getClipboardData({
          success() {
            wx.hideToast({
              complete() {
                Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__["default"])('公众号已复制，前往微信顶部搜索框粘贴搜索');
              }

            });
          }

        });
      }

    });
  },

  onLoad() {
    // 获取 user 信息
    let userInfo = wx.BaaS.storage.get('userinfo');
    weapp_zx__WEBPACK_IMPORTED_MODULE_1__["default"].get('user', 'me').then(res => {
      console.log(res);
    });

    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      });
    }
  },

  userInfoHandler(data) {
    weapp_zx__WEBPACK_IMPORTED_MODULE_1__["default"].handleUserInfo(data).then(res => {
      console.log('handle:user:info', res);
      app.globalData.userInfo = res;
      this.setData({
        userInfo: res,
        hasUserInfo: true
      });
    });
  },

  navToWallet() {
    wx.navigateTo({
      url: '/packages/wallet/index'
    });
  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
  },

  navToBox() {
    wx.switchTab({
      url: '/pages/box/index'
    });
  },

  navToInvite() {
    wx.navigateTo({
      url: '/packages/invite/index'
    });
  },

  navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index'
    });
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