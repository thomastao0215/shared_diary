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
  onLoad: function onLoad() {// let userInfo = wx.BaaS.storage.get('userinfo');
    // if (!userInfo) { // 授权
    //   this.setData({ inited: true });
    //   this.changeAndSwitchTab();
    // }
  },
  changeAndSwitchTab: function changeAndSwitchTab() {
    wx.switchTab({
      url: '/pages/my/index'
    });
  },
  grant: function grant(data) {
    var _this = this;

    console.log(data);

    if (data.detail.userInfo) {
      var handleResult = Promise.resolve();
      var userInfo = wx.BaaS.storage.get('userinfo');

      if (!userInfo) {
        // 授权
        handleResult = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].handleUserInfo(data);
      }

      handleResult.then(function () {
        return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].get('user', 'me');
      }).then(function (res) {
        _this.setData({
          inited: true
        });

        wx.BaaS.storage.set('userinfo', res.data);

        _this.changeAndSwitchTab();
      });
    } else {
      this.setData({
        inited: false
      });
    }
  }
});

/***/ })

/******/ }));