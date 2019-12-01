/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/cart/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./src/pages/cart/api.js":
/*!*******************************!*\
  !*** ./src/pages/cart/api.js ***!
  \*******************************/
/*! exports provided: fetchData, getSwipers, getTags, getPageInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSwipers", function() { return getSwipers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTags", function() { return getTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageInfo", function() { return getPageInfo; });
function fetchData(parameters = {}) {
  var tableName = 'news';
  var {
    pageSize,
    pageNo,
    tagName
  } = parameters; // 实例化查询对象

  const query = new wx.BaaS.Query(); // 设置查询条件（比较、字符串包含、组合等）

  query.compare('weight', '>', 0);
  query.compare('tag_name', '=', tagName); // 应用查询对象

  const News = new wx.BaaS.TableObject(tableName);
  return News.setQuery(query).limit(pageSize).offset(pageNo).find();
}
/**
 * 获取轮播图配置
 */

function getSwipers() {
  const tableName = 'swiper';
  const query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  const swiper = new wx.BaaS.TableObject(tableName);
  return swiper.setQuery(query).orderBy('-weight').find();
}
function getTags() {
  const tableName = 'tag';
  const query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  const Tags = new wx.BaaS.TableObject(tableName);
  return Tags.setQuery(query).orderBy('-weight').find();
}
function getPageInfo() {
  const tableName = 'page';
  const Page = new wx.BaaS.TableObject(tableName);
  return Page.find();
}

/***/ }),

/***/ "./src/pages/cart/index.js":
/*!*********************************!*\
  !*** ./src/pages/cart/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/pages/cart/api.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");
/* harmony import */ var utils_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/config */ "./src/utils/config.js");



Page({
  data: {
    productList: [],
    vip: '/slice/membership/membership.png',
    price: 0,
    couponId: '',
    coupon: null,
    userNote: '',
    assetsUrl: utils_config__WEBPACK_IMPORTED_MODULE_2__["default"].assetsUrl
  },

  onSearch(e) {
    // console.log('搜索内容:' + e.detail)
    this.query.keyWord = e.detail;
    wx.showLoading({
      title: '加载中'
    });
    this.query.offset = 0;
    this.finished = false;
    Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(this.query).then(res => {
      console.log(res.data.objects);
      this.setData({
        positions: res.data.objects
      });
      wx.hideLoading();
    });
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },

  onLoad() {}

});

/***/ })

/******/ }));