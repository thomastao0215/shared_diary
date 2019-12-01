/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/picker-column/index.js",
Object.assign(require("././../../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/picker-column/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/picker-column/index.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/component */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/component.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/common/utils.js");


const DEFAULT_DURATION = 200;
Object(_common_component__WEBPACK_IMPORTED_MODULE_0__["VantComponent"])({
    classes: ['active-class'],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        options: [],
        currentIndex: 0
    },
    created() {
        const { defaultIndex, initialOptions } = this.data;
        this.set({
            currentIndex: defaultIndex,
            options: initialOptions
        }).then(() => {
            this.setIndex(defaultIndex);
        });
    },
    computed: {
        count() {
            return this.data.options.length;
        },
        baseOffset() {
            const { data } = this;
            return (data.itemHeight * (data.visibleItemCount - 1)) / 2;
        },
        wrapperStyle() {
            const { data } = this;
            return [
                `transition: ${data.duration}ms`,
                `transform: translate3d(0, ${data.offset + data.baseOffset}px, 0)`,
                `line-height: ${data.itemHeight}px`
            ].join('; ');
        }
    },
    watch: {
        defaultIndex(value) {
            this.setIndex(value);
        }
    },
    methods: {
        onTouchStart(event) {
            this.set({
                startY: event.touches[0].clientY,
                startOffset: this.data.offset,
                duration: 0
            });
        },
        onTouchMove(event) {
            const { data } = this;
            const deltaY = event.touches[0].clientY - data.startY;
            this.set({
                offset: Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__["range"])(data.startOffset + deltaY, -(data.count * data.itemHeight), data.itemHeight)
            });
        },
        onTouchEnd() {
            const { data } = this;
            if (data.offset !== data.startOffset) {
                this.set({
                    duration: DEFAULT_DURATION
                });
                const index = Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__["range"])(Math.round(-data.offset / data.itemHeight), 0, data.count - 1);
                this.setIndex(index, true);
            }
        },
        onClickItem(event) {
            const { index } = event.currentTarget.dataset;
            this.setIndex(index, true);
        },
        adjustIndex(index) {
            const { data } = this;
            index = Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__["range"])(index, 0, data.count);
            for (let i = index; i < data.count; i++) {
                if (!this.isDisabled(data.options[i]))
                    return i;
            }
            for (let i = index - 1; i >= 0; i--) {
                if (!this.isDisabled(data.options[i]))
                    return i;
            }
        },
        isDisabled(option) {
            return Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__["isObj"])(option) && option.disabled;
        },
        getOptionText(option) {
            const { data } = this;
            return Object(_common_utils__WEBPACK_IMPORTED_MODULE_1__["isObj"])(option) && data.valueKey in option
                ? option[data.valueKey]
                : option;
        },
        setIndex(index, userAction) {
            const { data } = this;
            index = this.adjustIndex(index) || 0;
            const offset = -index * data.itemHeight;
            if (index !== data.currentIndex) {
                return this.set({ offset, currentIndex: index }).then(() => {
                    userAction && this.$emit('change', index);
                });
            }
            return this.set({ offset });
        },
        setValue(value) {
            const { options } = this.data;
            for (let i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    return this.setIndex(i);
                }
            }
            return Promise.resolve();
        },
        getValue() {
            const { data } = this;
            return data.options[data.currentIndex];
        }
    }
});


/***/ })

/******/ }));