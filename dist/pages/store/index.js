/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/store/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./src/pages/store/api.js":
/*!********************************!*\
  !*** ./src/pages/store/api.js ***!
  \********************************/
/*! exports provided: fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! weapp-zx */ "./node_modules/weapp-zx/index.js");

function fetchData(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      limit = _options.limit,
      offset = _options.offset,
      keyWord = _options.keyWord,
      tab = _options.tab;
  return weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].find('product', {
    limit: limit,
    offset: offset,
    fn: function fn(q) {
      var q1 = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery();
      keyWord && q1.contains('title', keyWord);
      var q2 = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery();
      keyWord && q2.contains('description', keyWord);
      var q3 = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery();
      keyWord && q3.contains('salary', keyWord);
      var orQuery = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].Query.or(q1, q2, q3);
      tab && q.in('tags', [tab]);
      q.compare('status', '=', '上架');
      var andQuery = weapp_zx__WEBPACK_IMPORTED_MODULE_0__["default"].Query.and(q, orQuery);
      return andQuery;
    }
  });
}

/***/ }),

/***/ "./src/pages/store/index.js":
/*!**********************************!*\
  !*** ./src/pages/store/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/pages/store/api.js");

Page({
  data: {
    banner: [{
      image_url: 'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/baea18aa59217cabd190b19fc1cf1617.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/d5683f01e132851229be21c52d808b62.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/af7d906e174cb160ab5a979310aa223d.jpg?imageView&quality=75&thumbnail=750x0'
    }],
    tabs: ['小香推荐💍', '稀释专区🎒', '约会🌹', '仙女🧚‍♀️'],
    tag: '',
    tabs_id: ['5dde4b3bca0da80f4b2e5f40', '5dde4b66ca0da80f472e6368'],
    products: [{
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '香水',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
      title: '日式软沙发',
      price: 100
    }, {
      img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
      title: '日式软沙发',
      price: 100
    }]
  },
  onReachBottom: function onReachBottom() {
    if (this.fetching || this.finished) {
      return;
    }

    this.fetchJobs('loadmore');
  },
  onSearch: function onSearch(e) {
    var _this = this;

    // console.log('搜索内容:' + e.detail)
    this.query.keyWord = e.detail;
    wx.showLoading({
      title: '加载中'
    });
    this.query.offset = 0;
    this.finished = false;
    Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(this.query).then(function (res) {
      console.log(res.data.objects);

      _this.setData({
        positions: res.data.objects
      });

      wx.hideLoading();
    });
  },
  init: function init() {
    this.fetching = false;
    this.finished = false;
    this.query = {
      limit: 10,
      offset: 0,
      keyWord: '',
      tag: this.data.tag
    };
    this.fetchJobs('fetch');
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  fetchJobs: function fetchJobs(type) {
    var _this2 = this;

    if (type === void 0) {
      type = 'fetch';
    }

    if (type === 'fetch') {
      this.query.offset = 0;
      this.finished = false;
    }

    this.fetching = true;
    type === 'fetch' && wx.showLoading({
      title: '加载中...'
    });
    Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(this.query).then(function (res) {
      var data = res.data.objects || [];

      if (data.length < _this2.query.limit) {
        _this2.finished = true;
      } else {
        _this2.query.offset += _this2.query.limit;
      }

      var products = _this2.data.products;
      var newProdcuts = type === 'fetch' ? [].concat(data) : [].concat(products, data);
      _this2.fetching = false;

      _this2.setData({
        products: newProdcuts
      });

      type === 'fetch' && wx.hideLoading();
    });
  },
  bindTabChange: function bindTabChange(e) {
    var current = e.detail.index;
    this.setData({
      tag: this.data.tabs_id[current]
    });
  },
  navToDetail: function navToDetail(e) {
    console.log(e);
    wx.navigateTo({
      url: '/packages/product/index'
    });
  },
  cardSwiper: function cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },
  onLoad: function onLoad() {
    this.init();
  }
});

/***/ })

/******/ }));