/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/submit-bar/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/submit-bar/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/submit-bar/index.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _mixins_safe_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/safe-area */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/safe-area.js");


Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    mixins: [Object(_mixins_safe_area__WEBPACK_IMPORTED_MODULE_1__["safeArea"])()],
    classes: [
        'bar-class',
        'price-class',
        'button-class'
    ],
    props: {
        tip: {
            type: null,
            observer: 'updateTip'
        },
        tipIcon: String,
        type: Number,
        price: {
            type: null,
            observer: 'updatePrice'
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: '¥'
        },
        buttonType: {
            type: String,
            value: 'danger'
        },
        decimalLength: {
            type: Number,
            value: 2,
            observer: 'updatePrice'
        },
        suffixLabel: String
    },
    methods: {
        updatePrice() {
            const { price, decimalLength } = this.data;
            this.set({
                hasPrice: typeof price === 'number',
                priceStr: (price / 100).toFixed(decimalLength)
            });
        },
        updateTip() {
            this.set({ hasTip: typeof this.data.tip === 'string' });
        },
        onSubmit(event) {
            this.$emit('submit', event.detail);
        }
    }
});


/***/ })

/******/ }));