/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./shared/components/common/image/index.js",
{

/***/ "./shared/components/common/image/constants.js":
/*!*****************************************************!*\
  !*** ./shared/components/common/image/constants.js ***!
  \*****************************************************/
/*! exports provided: SHOW_TYPES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_TYPES", function() { return SHOW_TYPES; });
const SHOW_TYPES = {
  SWIPE: 'swiper'
};


/***/ }),

/***/ "./shared/components/common/image/index.js":
/*!*************************************************!*\
  !*** ./shared/components/common/image/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./shared/components/common/image/constants.js");


Component({
  type: 'image',

  properties: {
    autoPlay: {
      type: Boolean,
      value: true
    },
    hasDots: {
      type: Boolean,
      value: false
    },
    showType: {
      type: String,
      value: _constants__WEBPACK_IMPORTED_MODULE_0__["SHOW_TYPES"].SWIPE
    },
    imageList: {
      type: Array,
      value: []
    },
    pageMargin: {
      type: [String, Number],
      value: 10
    },
    imageHeight: {
      type: Number,
      value: 140
    },
    needDesc: {
      type: Boolean,
      value: false
    }
  },

  data: {
    swiperCurrent: 0,
  },

  methods: {
    handleImageClick(e) {
      const { imgIndex } = e.currentTarget.dataset;
      const { imageList: images } = this.data;
      const image = images[imgIndex];
      image.index = imgIndex;
      this.triggerEvent('item-click', image);
    },

    handleImageChange(e) {
      const { listData } = this.data;
      const { current } = e.detail;
      this.setData({
        current,
        currentItemHasTitle: this.computeCurrentHasTitle(listData, current)
      });

      this.triggerEvent('itemChange', { value: current });
    },

    swiperChange(e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  }
});


/***/ })

/******/ });