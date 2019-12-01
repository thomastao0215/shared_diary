/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/goods-action-button/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/goods-action-button/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/goods-action-button/index.js ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _mixins_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/link */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/link.js");
/* harmony import */ var _mixins_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixins/button */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/button.js");
/* harmony import */ var _mixins_open_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mixins/open-type */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/open-type.js");




Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    mixins: [_mixins_link__WEBPACK_IMPORTED_MODULE_1__["link"], _mixins_button__WEBPACK_IMPORTED_MODULE_2__["button"], _mixins_open_type__WEBPACK_IMPORTED_MODULE_3__["openType"]],
    props: {
        text: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: 'danger'
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});


/***/ })

/******/ }));