/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./src/packages/address/list/index.js",
Object.assign(require("././../../commonchunks.js").modules, require("././../../../commons.js").modules, {

/***/ "./src/packages/address/list/index.js":
/*!********************************************!*\
  !*** ./src/packages/address/list/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/image */ "./src/utils/image.js");
/* harmony import */ var weapp_zx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! weapp-zx */ "./node_modules/_weapp-zx@1.1.0@weapp-zx/index.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/packages/address/list/api.js");




var app = getApp();
Page({
  data: {
    icon1: '',
    icon2: '',
    userAddressList: []
  },
  onLoad: function onLoad(query) {
    if (query === void 0) {
      query = {};
    }

    var icon1 = Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/location/icon_location.png');
    var icon2 = Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/location/icon_newlocation.png');
    this.setData({
      icon1: icon1,
      icon2: icon2
    });
    this.init();

    if (query.select) {
      this.select = true;
    }
  },
  onShow: function onShow() {
    if (app.globalData.refreshAddressList) {
      this.init();
      app.globalData.refreshAddressList = false;
    }
  },
  init: function init() {
    this.limit = 20;
    this.offset = 0;
    this.fetching = false;
    this.finished = false;
    this.fetchAddress('fetch');
  },
  fetchAddress: function fetchAddress(type) {
    var _this = this;

    if (type === void 0) {
      type = 'fetch';
    }

    if (type === 'fetch') {
      this.offset = 0;
      this.finished = false;
    }

    this.fetching = true;
    type === 'fetch' && wx.showLoading({
      title: '加载中...'
    });
    Object(_api__WEBPACK_IMPORTED_MODULE_3__["fetchData"])({
      limit: this.limit,
      offset: this.offset
    }).then(function (res) {
      var data = res.data.objects || [];

      if (data.length < _this.limit) {
        _this.finished = true;
      } else {
        _this.offset += _this.limit;
      }

      var address = _this.data.address;
      var userAddressList = type === 'fetch' ? [].concat(data) : [].concat(address, data);
      _this.fetching = false;

      _this.setData({
        userAddressList: userAddressList
      });

      type === 'fetch' && wx.hideLoading();
    });
  },
  onEdit: function onEdit(e) {
    var address = e.target.dataset.address;
    wx.navigateTo({
      url: '/packages/address/edit/index?address=' + JSON.stringify(address)
    });
  },
  onDelete: function onDelete(e) {
    var _this2 = this;

    var address = e.target.dataset.address;
    var id = address.id;
    weapp_zx__WEBPACK_IMPORTED_MODULE_1__["default"].update('address', id, {
      is_delete: 1
    }).then(function () {
      vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"].success({
        message: '删除成功'
      });

      _this2.init();
    }).catch(function (err) {
      vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"].fail({
        message: err.message || err.msg || '删除'
      });
    });
  },
  onCreate: function onCreate() {
    wx.navigateTo({
      url: '/packages/address/edit/index'
    });
  },
  onClickAddress: function onClickAddress(e) {
    if (!this.select) {
      return;
    }

    var address = e.target.dataset.address;
    var province = address.province,
        city = address.city,
        county = address.county,
        addr = address.address,
        phone = address.phone,
        name = address.name,
        id = address.id;
    var addressStr = province + city + county + addr;
    var addressId = id;
    var addressInfo = {
      name: name,
      phone: phone,
      address: addressStr
    };
    app.globalData.isSetAddress = true;
    app.globalData.addressId = addressId;
    app.globalData.addressInfo = addressInfo;
    wx.navigateBack();
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '??????????!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});

/***/ })

/******/ }));