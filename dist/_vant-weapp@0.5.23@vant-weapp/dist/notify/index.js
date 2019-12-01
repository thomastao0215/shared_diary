/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/notify/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/notify/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/notify/index.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _common_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/color */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/color.js");
/* harmony import */ var _mixins_safe_area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixins/safe-area */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/safe-area.js");



Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    mixins: [Object(_mixins_safe_area__WEBPACK_IMPORTED_MODULE_2__["safeArea"])()],
    props: {
        text: String,
        color: {
            type: String,
            value: '#fff'
        },
        backgroundColor: {
            type: String,
            value: _common_color__WEBPACK_IMPORTED_MODULE_1__["RED"]
        },
        duration: {
            type: Number,
            value: 3000
        },
        zIndex: {
            type: Number,
            value: 110
        }
    },
    methods: {
        show() {
            const { duration } = this.data;
            clearTimeout(this.timer);
            this.set({
                show: true
            });
            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(() => {
                    this.hide();
                }, duration);
            }
        },
        hide() {
            clearTimeout(this.timer);
            this.set({
                show: false
            });
        }
    }
});


/***/ })

/******/ }));