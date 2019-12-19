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
    showModal: false,
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
    show: false,
    recommandation: [{
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
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
        show: false,
        info_images: data.info_images,
        sku_group: data.sku_group
      });

      Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchSku"])(data.id).then(function (res) {
        _this.setData({
          sku_list: res.data.objects
        });
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
  onClickBuy: function onClickBuy() {
    if (this.data.sku_list) {
      this.setData({
        operation: '立即购买',
        show: true
      });
    }
  },
  onClickCart: function onClickCart() {
    if (this.data.sku_list) {
      this.setData({
        operation: '加入购物车',
        show: true
      });
    }
  },
  showPopup: function showPopup() {
    this.setData({
      show: true
    });
  },
  showSheet: function showSheet(value) {
    this.setData({
      'sheet.show': value
    });
  },
  showShareImageModal: function showShareImageModal() {
    this.setData({
      showModal: true
    });
  },
  closeActionSheet: function closeActionSheet() {
    this.setData({
      'sheet.show': false
    });
    this.triggerEvent('finished');
  },
  closeShareImageModal: function closeShareImageModal() {
    this.setData({
      showModal: false
    });
  },
  handleActionClick: function handleActionClick(e) {
    if (e.detail.openType === 'share') return;
    wx.showLoading({
      title: '正在生成'
    });
    this.setData({
      showCanvas: true
    }, this.draw.bind(this));
  },
  draw: function draw() {
    var _this2 = this;

    this.loadShopInfo().then(this.loadShareSettings.bind(this)).then(this.loadFeatureImage.bind(this)).then(this.drawQrCode.bind(this)).then(this.createPosterTempPath.bind(this)).then(function (src) {
      _this2.setData({
        src: src,
        showModal: true,
        showCanvas: false
      }, function () {
        _this2.triggerEvent('finished');
      });
    }).catch(function () {
      _this2.setData({
        showCanvas: false
      });

      _this2.closeShareImageModal();

      _this2.closeActionSheet();
    });
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '我发现了一个好东西',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});

/***/ })

/******/ }));