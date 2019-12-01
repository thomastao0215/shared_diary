/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/invite/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

/***/ "./src/packages/invite/index.js":
/*!**************************************!*\
  !*** ./src/packages/invite/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/image */ "./src/utils/image.js");
/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/api */ "./src/utils/api.js");
/* harmony import */ var utils_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/util */ "./src/utils/util.js");



Page({
  onLoad() {
    Object(utils_api__WEBPACK_IMPORTED_MODULE_1__["request"])(utils_api__WEBPACK_IMPORTED_MODULE_1__["api"].info).then(res => {
      const user = res.user;
      this.user = user;
      const ticketImage = Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/invite/ticket.png');
      this.setData({
        ticketImage,
        c1: user.invited_subscribed_count,
        c2: user.invited_not_subscribed_count
      });
    });
  },

  onShareAppMessage() {
    return {
      title: '小分香，分享每一份香!',
      path: '/pages/entry/index?from_uid=' + this.user.id + '&from_uid_time=' + utils_util__WEBPACK_IMPORTED_MODULE_2__["default"].formatTime(new Date()),
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }

});

/***/ })

/******/ }));