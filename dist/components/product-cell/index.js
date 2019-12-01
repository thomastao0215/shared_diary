/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/components/product-cell/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./src/components/product-cell/index.js":
/*!**********************************************!*\
  !*** ./src/components/product-cell/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js");

Component({
  type: 'product-cell',
  properties: {
    productId: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    description: {
      type: String,
      value: ''
    },
    cover_image: {
      type: String,
      value: ''
    },
    status: {
      type: String,
      value: ''
    },
    priority: {
      type: String,
      value: ''
    },
    brand_id: {
      type: String,
      value: ''
    }
  },

  attached() {// console.log(this.data.seekerStatus)
    // const { companyId } = this.data
    // if (companyId) {
    //   zx.get('companies', companyId)
    //     .then(res => {
    //       const { data } = res
    //       this.setData({
    //         company1: data.company_name,
    //         companyLogo1: data.logo
    //       })
    //     })
    // }
  },

  methods: {
    navToDetail() {
      wx.navigateTo({
        url: '/packages/product/index?productId=' + this.data.productId
      });
    }

  }
});

/***/ })

/******/ }));