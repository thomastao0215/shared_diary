/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/index/index.js",
{

/***/ "./src/pages/index/api.js":
/*!********************************!*\
  !*** ./src/pages/index/api.js ***!
  \********************************/
/*! exports provided: fetchData, getSwipers, getTags, getPageInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSwipers", function() { return getSwipers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTags", function() { return getTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageInfo", function() { return getPageInfo; });
function fetchData(parameters) {
  if (parameters === void 0) {
    parameters = {};
  }

  var tableName = 'news';
  var _parameters = parameters,
      pageSize = _parameters.pageSize,
      pageNo = _parameters.pageNo,
      tagName = _parameters.tagName; // 实例化查询对象

  var query = new wx.BaaS.Query(); // 设置查询条件（比较、字符串包含、组合等）

  query.compare('weight', '>', 0);
  query.compare('tag_name', '=', tagName); // 应用查询对象

  var News = new wx.BaaS.TableObject(tableName);
  return News.setQuery(query).limit(pageSize).offset(pageNo).find();
}
/**
 * 获取轮播图配置
 */

function getSwipers() {
  var tableName = 'swiper';
  var query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  var swiper = new wx.BaaS.TableObject(tableName);
  return swiper.setQuery(query).orderBy('-weight').find();
}
function getTags() {
  var tableName = 'tag';
  var query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  var Tags = new wx.BaaS.TableObject(tableName);
  return Tags.setQuery(query).orderBy('-weight').find();
}
function getPageInfo() {
  var tableName = 'page';
  var Page = new wx.BaaS.TableObject(tableName);
  return Page.find();
}

/***/ }),

/***/ "./src/pages/index/index.js":
/*!**********************************!*\
  !*** ./src/pages/index/index.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/pages/index/api.js");

Page({
  data: {
    tabs: ['小香推荐💍', '上学必备🎒', '约会🌹', '仙女🧚‍♀️'],
    articles: [],
    banner: [{
      image_url: 'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/baea18aa59217cabd190b19fc1cf1617.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/d5683f01e132851229be21c52d808b62.jpg?imageView&quality=75&thumbnail=750x0'
    }, {
      image_url: 'https://yanxuan.nosdn.127.net/af7d906e174cb160ab5a979310aa223d.jpg?imageView&quality=75&thumbnail=750x0'
    }]
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
  cardSwiper: function cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },
  onLoad: function onLoad() {}
});

/***/ })

/******/ });