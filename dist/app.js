/******/ var webpackRequire = require("././webpack-require");
/******/ webpackRequire(
"./src/app.js",
Object.assign(require("././commons.js").modules, {

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js");

const clientID = '99fe8993f749105e6a6b';
weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].init(clientID);
App({
  onLaunch() {
    weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].login().then(res => {
      console.log('user:login', res);
      this.globalData.userId = res.id;
    });
  },

  globalData: {
    userId: null,
    userInfo: null
  }
});

/***/ })

/******/ }));