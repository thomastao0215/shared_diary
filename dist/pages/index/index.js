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
    tabs: ["小香推荐💍", "上学必备🎒", "约会🌹", "仙女🧚‍♀️"],
    articles: [],
    banner: [{
      image_url: "https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0"
    }, {
      image_url: "https://yanxuan.nosdn.127.net/baea18aa59217cabd190b19fc1cf1617.jpg?imageView&quality=75&thumbnail=750x0"
    }, {
      image_url: "https://yanxuan.nosdn.127.net/d5683f01e132851229be21c52d808b62.jpg?imageView&quality=75&thumbnail=750x0"
    }, {
      image_url: "https://yanxuan.nosdn.127.net/af7d906e174cb160ab5a979310aa223d.jpg?imageView&quality=75&thumbnail=750x0"
    }]
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

/******/ });