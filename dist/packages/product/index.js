/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/product/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

/***/ "./src/packages/product/index.js":
/*!***************************************!*\
  !*** ./src/packages/product/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/packages/product/api.js");
// 获取应用实例

Page({
  data: {
    product_id: '',
    title: '',
    description: '',
    cover_image: '',
    images: [],
    status: '',
    priority: 100,
    sold_count: 100,
    brief_title: '',
    brand: {
      brand_name: '',
      brand_origin: '',
      brand_info: '',
      brand_logo: '',
      brand_name_zh: ''
    },
    info_images: [],
    gallery: [{
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png'
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png'
    }],
    show: true,
    recommandation: [{
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
      title: '日式软沙发',
      price: 100
    }]
  },
  onLoad: function onLoad(query) {
    var _this = this;

    if (query === void 0) {
      query = {};
    }

    var _query = query,
        productId = _query.productId;
    wx.showLoading({
      title: '加载中'
    });
    Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(productId).then(function (res) {
      var data = res.data;
      console.log(data);

      _this.setData({
        product_id: data.id,
        title: data.title,
        description: data.description,
        cover_image: data.cover_image,
        status: data.status,
        sold_count: data.sold_count,
        images: data.images,
        brief_title: data.brief_title,
        brand: data.brand,
        info_images: data.info_images
      });

      wx.hideLoading();
    });
  },
  onClose: function onClose() {
    var show = !this.data.show;
    this.setData({
      show: show
    });
  },
  showPopup: function showPopup() {
    this.setData({
      show: true
    });
  }
});

/***/ })

/******/ }));