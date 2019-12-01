/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/entry/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./src/pages/entry/index.js":
/*!**********************************!*\
  !*** ./src/pages/entry/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js");
 // import { getUserRole, changeUserRole } from 'utils/role'
// 获取应用实例

Page({
  data: {
    inited: false,
    logo: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png'
  },

  onLoad(query = {}) {
    const {
      isSelected
    } = query;
    this.setData({
      inited: true
    });
    let userInfo = wx.BaaS.storage.get('userinfo');

    if (userInfo) {
      // 授权
      this.changeAndSwitchTab();
    }
  },

  changeAndSwitchTab() {
    wx.switchTab({
      url: '/pages/my/index'
    });
  },

  handleClickSeeker() {
    weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me').then(res => {
      this.changeAndSwitchTab(2);
    });
  },

  grant(data) {
    let handleResult = Promise.resolve();
    let userInfo = wx.BaaS.storage.get('userinfo');

    if (!userInfo) {
      // 授权
      handleResult = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].handleUserInfo(data);
    }

    handleResult.then(() => weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me')).then(res => {
      wx.BaaS.storage.set('userinfo', res.data);
      this.changeAndSwitchTab();
    });
  },

  handleSelectRecruiter() {
    weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me').then(res => {
      if (!res.data.recruiter) {
        wx.navigateTo({
          url: '/pages/login/index'
        });
      } else {
        this.changeAndSwitchTab(1);
      }
    });
  }

});

/***/ })

/******/ }));