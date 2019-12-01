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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/packages/address/list/api.js");
/* harmony import */ var shared_utils_map_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shared/utils/map-keys */ "./shared/utils/map-keys.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");




const app = getApp();
Page({
  data: {
    icon1: '',
    icon2: '',
    userAddressList: []
  },

  onLoad(query = {}) {
    const icon1 = Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/location/icon_location.png');
    const icon2 = Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/location/icon_newlocation.png');
    this.setData({
      icon1,
      icon2
    });
    this.init();

    if (query.select) {
      this.select = true;
    }
  },

  onShow() {
    if (app.globalData.refreshAddressList) {
      this.init();
      app.globalData.refreshAddressList = false;
    }
  },

  init() {
    this.limit = 20;
    this.offset = 0;
    this.fetching = false;
    this.finished = false;
    this.fetchAddress('fetch');
  },

  fetchAddress(type = 'fetch') {
    if (type === 'fetch') {
      this.offset = 0;
      this.finished = false;
    }

    this.fetching = true;
    type === 'fetch' && wx.showLoading({
      title: '加载中...'
    });
    Object(_api__WEBPACK_IMPORTED_MODULE_1__["fetchData"])({
      limit: this.limit,
      offset: this.offset
    }).then(res => {
      let data = res.data.objects || [];

      if (data.length < this.limit) {
        this.finished = true;
      } else {
        this.offset = this.offset + this.limit;
      }

      const {
        address
      } = this.data;
      const userAddressList = type === 'fetch' ? [...data] : [...address, ...data];
      this.fetching = false;
      this.setData({
        userAddressList
      });
      type === 'fetch' && wx.hideLoading();
    });
  },

  onEdit(e) {
    const {
      address
    } = e.target.dataset;
    wx.navigateTo({
      url: '/packages/address/edit/index?address=' + JSON.stringify(address)
    });
  },

  onDelete(e) {
    const {
      address
    } = e.target.dataset;
    const {
      id
    } = address;
    zx.update('address', id, {
      is_delete: 1
    }).then(() => {
      vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_3__["default"].success({
        message: '删除成功'
      });
      this.init();
    }).catch(err => {
      vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_3__["default"].fail({
        message: err.message || err.msg || '删除'
      });
    });
  },

  onCreate() {
    wx.navigateTo({
      url: '/packages/address/edit/index'
    });
  },

  onClickAddress(e) {
    if (!this.select) {
      return;
    }

    const {
      address
    } = e.target.dataset;
    const {
      province,
      city,
      county,
      address: addr,
      phone,
      name,
      id
    } = address;
    const addressStr = province + city + county + addr;
    const addressId = id;
    const addressInfo = {
      name,
      phone,
      address: addressStr
    };
    app.globalData.isSetAddress = true;
    app.globalData.addressId = addressId;
    app.globalData.addressInfo = addressInfo;
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '??????????!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }

});

/***/ })

/******/ }));