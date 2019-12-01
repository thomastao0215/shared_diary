/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/back/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

/***/ "./src/packages/back/index.js":
/*!************************************!*\
  !*** ./src/packages/back/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/api */ "./src/utils/api.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/packages/back/utils.js");



const app = getApp();
Page({
  data: {
    show: false,
    mainActiveIndex: 0,
    activeId: -1,
    timeDesc: '',
    dateStr: '',
    timeStr: '',
    weekStr: '',
    addressId: ''
  },

  onLoad(query = {}) {
    const {
      id,
      time = '',
      address = ''
    } = query;
    this.id = id;
    this.lock = false;
    this.edit = !!time;

    if (this.edit) {
      const d = new Date(time);
      const addr = JSON.parse(address);
      const weekStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getWeekStr"])(0, d);
      const timeStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getTimeStr"])(d);
      const dateStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDateStr"])(0, d);
      const addressId = addr.id;
      const timeDesc = dateStr + ' ' + weekStr + ' ' + timeStr;
      const addressInfo = {};
      addressInfo.name = addr.name;
      addressInfo.phone = addr.phone;
      addressInfo.address = addr.address_name + ' ' + addr.address;
      this.setData({
        weekStr,
        timeStr,
        dateStr,
        addressId,
        timeDesc,
        addressInfo
      });
    }
  },

  onShow() {
    this.setData({
      items: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getItems"])()
    });

    if (app.globalData.isSetAddress === true) {
      const addressId = app.globalData.addressId;
      const addressInfo = app.globalData.addressInfo;
      this.setData({
        addressId,
        addressInfo
      });
      app.globalData.isSetAddress = false;
    }
  },

  onSelectTime() {
    this.setData({
      show: true
    });
  },

  checkTime() {
    const day = Number(this.data.dateStr.split('-').join(''));
    const time = Number(this.data.timeStr.split(':')[0]);

    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["checkSelectTime"])(day, time)) {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请重新选择时间');
      const items = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getItems"])();
      this.setData({
        items,
        timeDesc: '',
        dateStr: '',
        timeStr: '',
        weekStr: '',
        mainActiveIndex: 0,
        activeId: -1
      });
      return false;
    }

    return true;
  },

  onClose() {
    this.setData({
      show: false
    });
    this.checkTime();
  },

  onClickNav(e) {
    this.setData({
      mainActiveIndex: e.detail.index
    });
  },

  onClickItem(e) {
    const {
      id: activeId,
      dateStr,
      timeStr,
      weekStr
    } = e.detail;
    this.setData({
      activeId,
      dateStr,
      timeStr,
      weekStr,
      timeDesc: `${dateStr} ${weekStr} ${timeStr}`
    });
  },

  onClickConfirm() {
    if (this.lock) return;
    if (!this.checkTime()) return;
    const {
      timeDesc,
      addressId,
      dateStr,
      timeStr
    } = this.data;

    if (!timeDesc) {
      return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请选择取件时间');
    }

    if (!addressId) {
      return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请选择取件地址');
    }

    const tt = timeStr.split('-')[0];
    const time = `${dateStr} ${tt}:00`;
    this.lock = true;
    vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"].loading('预约中...');

    if (this.edit) {
      return Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])({ ...utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back_cancel,
        id: this.id
      }).then(() => {
        return Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])({ ...utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back,
          id: this.id
        }, {
          recomanded_post_back_address_id: this.data.addressId,
          recomanded_post_back_time: time
        });
      }).then(() => {
        Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('预约成功');
        setTimeout(() => {
          this.lock = false;
          wx.navigateBack();
        }, 1500);
      }).catch(err => {
        this.lock = false;
        Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message || err.msg || err || '预约失败');
      });
    }

    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])({ ...utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back,
      id: this.id
    }, {
      recomanded_post_back_address_id: this.data.addressId,
      recomanded_post_back_time: time
    }).then(() => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('预约成功');
      setTimeout(() => {
        this.lock = false;
        wx.navigateBack();
      }, 1500);
    }).catch(err => {
      this.lock = false;
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message || err.msg || err || '预约失败');
    });
  },

  navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index?select=1'
    });
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