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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/packages/address/edit/api.js");
/* harmony import */ var shared_utils_map_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shared/utils/map-keys */ "./shared/utils/map-keys.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");
/* harmony import */ var _area__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./area */ "./src/packages/address/edit/area.js");




const app = getApp();
Page({
  data: {
    areaList: _area__WEBPACK_IMPORTED_MODULE_3__["default"],
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

  onLoad(query = {}) {
    this.lock = false;
    let {
      address
    } = query;

    if (address) {
      address = JSON.parse(address);
      this.id = address.id;
      this.setData({
        address
      });
    }
  },

  onClickDefaultBtn() {
    const isDefault = !this.data.address.isDefault ? 1 : 0;
    this.setData({
      'address.isDefault': isDefault
    });
  },

  onClickSelectArea() {
    this.setData({
      showSelectArea: true
    });
  },

  onAreaCancel() {
    this.setData({
      showSelectArea: false
    });
  },

  onAreaConfirm(e) {
    const {
      values
    } = e.detail;
    const province = values[0].name;
    const city = values[1].name;
    const county = values[2].name;
    const addressName = province + ' ' + city + ' ' + county;
    this.setData({
      showSelectArea: false,
      'address.province': province,
      'address.city': city,
      'address.county': county,
      'address.addressName': addressName
    });
  },

  onNameInput(e) {
    this.setData({
      'address.name': e.detail
    });
  },

  onPhoneInput(e) {
    this.setData({
      'address.phone': e.detail
    });
  },

  onAddressInput(e) {
    this.setData({
      'address.address': e.detail
    });
  },

  onSave() {
    if (this.lock) {
      return;
    }

    const {
      address
    } = this.data;
    const keys = Object.keys(address);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key !== 'company' && key !== 'isDefault' && !address[key]) {
        return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])('请完善信息');
      }
    }

    this.lock = true;
    let handle = null;

    if (!this.id) {
      handle = Object(_api__WEBPACK_IMPORTED_MODULE_0__["createAddress"])(address);
    } else {
      handle = Object(_api__WEBPACK_IMPORTED_MODULE_0__["updateAddress"])(this.id, address);
    }

    handle.then(() => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])('保存成功');
      this.navigateBack();
    }).catch(() => {
      this.lock = false;
    });
  },

  navigateBack() {
    app.globalData.refreshAddressList = true;
    setTimeout(() => wx.navigateBack(), 1500);
  },

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }

});

/***/ })

/******/ }));