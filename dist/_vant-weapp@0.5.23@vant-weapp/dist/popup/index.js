/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/popup/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/popup/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/popup/index.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _mixins_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/transition */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/transition.js");
/* harmony import */ var _mixins_safe_area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mixins/safe-area */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/mixins/safe-area.js");



Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    classes: [
        'enter-class',
        'enter-active-class',
        'enter-to-class',
        'leave-class',
        'leave-active-class',
        'leave-to-class'
    ],
    mixins: [Object(_mixins_transition__WEBPACK_IMPORTED_MODULE_1__["transition"])(false), Object(_mixins_safe_area__WEBPACK_IMPORTED_MODULE_2__["safeArea"])()],
    props: {
        transition: {
            type: String,
            observer: 'observeClass'
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        position: {
            type: String,
            value: 'center',
            observer: 'observeClass'
        }
    },
    created() {
        this.observeClass();
    },
    methods: {
        onClickOverlay() {
            this.$emit('click-overlay');
            if (this.data.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        observeClass() {
            const { transition, position } = this.data;
            const updateData = {
                name: transition || position
            };
            if (transition === 'none') {
                updateData.duration = 0;
            }
            this.set(updateData);
        }
    }
});


/***/ })

/******/ }));