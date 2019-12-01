/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/tag/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/tag/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/tag/index.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _common_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/color */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/color.js");


const DEFAULT_COLOR = '#999';
const COLOR_MAP = {
    danger: _common_color__WEBPACK_IMPORTED_MODULE_1__["RED"],
    primary: _common_color__WEBPACK_IMPORTED_MODULE_1__["BLUE"],
    success: _common_color__WEBPACK_IMPORTED_MODULE_1__["GREEN"],
    warning: _common_color__WEBPACK_IMPORTED_MODULE_1__["ORANGE"]
};
Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style() {
            const color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
            const key = this.data.plain ? 'color' : 'background-color';
            const style = { [key]: color };
            if (this.data.textColor) {
                style.color = this.data.textColor;
            }
            return Object.keys(style).map(key => `${key}: ${style[key]}`).join(';');
        }
    }
});


/***/ })

/******/ }));