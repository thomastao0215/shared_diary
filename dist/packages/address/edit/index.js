/******/ var webpackRequire = require("././../../../webpack-require");
/******/ webpackRequire(
"./src/packages/address/edit/index.js",
Object.assign(require("././../../commonchunks.js").modules, require("././../../../commons.js").modules, {

/***/ "./src/packages/address/edit/index.js":
/*!********************************************!*\
  !*** ./src/packages/address/edit/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/packages/address/edit/api.js");
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./area */ "./src/packages/address/edit/area.js");



var app = getApp();
Page({
  data: {
    areaList: _area__WEBPACK_IMPORTED_MODULE_2__["default"],
    isDefault: false,
    showSelectArea: false,
    address: {
      addressName: '',
      company: '',
      province: '',
      city: '',
      county: '',
      address: '',
      name: '',
      phone: '',
      isDefault: 0
    },
    addressStr: ''
  },
  onLoad: function onLoad(query) {
    if (query === void 0) {
      query = {};
    }

    this.lock = false;
    var _query = query,
        address = _query.address;

    if (address) {
      address = JSON.parse(address);
      this.id = address.id;
      this.setData({
        address: address
      });
    }
  },
  onClickDefaultBtn: function onClickDefaultBtn() {
    var isDefault = !this.data.address.isDefault ? 1 : 0;
    this.setData({
      'address.isDefault': isDefault
    });
  },
  onClickSelectArea: function onClickSelectArea() {
    this.setData({
      showSelectArea: true
    });
  },
  onAreaCancel: function onAreaCancel() {
    this.setData({
      showSelectArea: false
    });
  },
  onAreaConfirm: function onAreaConfirm(e) {
    var values = e.detail.values;
    var province = values[0].name;
    var city = values[1].name;
    var county = values[2].name;
    var addressName = province + ' ' + city + ' ' + county;
    this.setData({
      showSelectArea: false,
      'address.province': province,
      'address.city': city,
      'address.county': county,
      'address.addressName': addressName
    });
  },
  onNameInput: function onNameInput(e) {
    this.setData({
      'address.name': e.detail
    });
  },
  onPhoneInput: function onPhoneInput(e) {
    this.setData({
      'address.phone': e.detail
    });
  },
  onAddressInput: function onAddressInput(e) {
    this.setData({
      'address.address': e.detail
    });
  },
  onSave: function onSave() {
    var _this = this;

    if (this.lock) {
      return;
    }

    var address = this.data.address;
    var keys = Object.keys(address);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'company' && key !== 'isDefault' && !address[key]) {
        return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__["default"])('请完善信息');
      }
    }

    this.lock = true;
    var handle = null;

    if (!this.id) {
      handle = Object(_api__WEBPACK_IMPORTED_MODULE_1__["createAddress"])(address);
    } else {
      handle = Object(_api__WEBPACK_IMPORTED_MODULE_1__["updateAddress"])(this.id, address);
    }

    handle.then(function () {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__["default"])('保存成功');

      _this.navigateBack();
    }).catch(function () {
      _this.lock = false;
    });
  },
  navigateBack: function navigateBack() {
    app.globalData.refreshAddressList = true;
    setTimeout(function () {
      return wx.navigateBack();
    }, 1500);
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});

/***/ })

/******/ }));