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
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/vant-weapp/dist/toast/toast.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/packages/back/utils.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var app = getApp();
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
  onLoad: function onLoad(query) {
    if (query === void 0) {
      query = {};
    }

    var _query = query,
        id = _query.id,
        _query$time = _query.time,
        time = _query$time === void 0 ? '' : _query$time,
        _query$address = _query.address,
        address = _query$address === void 0 ? '' : _query$address;
    this.id = id;
    this.lock = false;
    this.edit = !!time;

    if (this.edit) {
      var d = new Date(time);
      var addr = JSON.parse(address);
      var weekStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getWeekStr"])(0, d);
      var timeStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getTimeStr"])(d);
      var dateStr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getDateStr"])(0, d);
      var addressId = addr.id;
      var timeDesc = dateStr + ' ' + weekStr + ' ' + timeStr;
      var addressInfo = {};
      addressInfo.name = addr.name;
      addressInfo.phone = addr.phone;
      addressInfo.address = addr.address_name + ' ' + addr.address;
      this.setData({
        weekStr: weekStr,
        timeStr: timeStr,
        dateStr: dateStr,
        addressId: addressId,
        timeDesc: timeDesc,
        addressInfo: addressInfo
      });
    }
  },
  onShow: function onShow() {
    this.setData({
      items: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getItems"])()
    });

    if (app.globalData.isSetAddress === true) {
      var addressId = app.globalData.addressId;
      var addressInfo = app.globalData.addressInfo;
      this.setData({
        addressId: addressId,
        addressInfo: addressInfo
      });
      app.globalData.isSetAddress = false;
    }
  },
  onSelectTime: function onSelectTime() {
    this.setData({
      show: true
    });
  },
  checkTime: function checkTime() {
    var day = Number(this.data.dateStr.split('-').join(''));
    var time = Number(this.data.timeStr.split(':')[0]);

    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["checkSelectTime"])(day, time)) {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请重新选择时间');
      var items = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getItems"])();
      this.setData({
        items: items,
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
  onClose: function onClose() {
    this.setData({
      show: false
    });
    this.checkTime();
  },
  onClickNav: function onClickNav(e) {
    this.setData({
      mainActiveIndex: e.detail.index
    });
  },
  onClickItem: function onClickItem(e) {
    var _e$detail = e.detail,
        activeId = _e$detail.id,
        dateStr = _e$detail.dateStr,
        timeStr = _e$detail.timeStr,
        weekStr = _e$detail.weekStr;
    this.setData({
      activeId: activeId,
      dateStr: dateStr,
      timeStr: timeStr,
      weekStr: weekStr,
      timeDesc: dateStr + " " + weekStr + " " + timeStr
    });
  },
  onClickConfirm: function onClickConfirm() {
    var _this = this;

    if (this.lock) return;
    if (!this.checkTime()) return;
    var _this$data = this.data,
        timeDesc = _this$data.timeDesc,
        addressId = _this$data.addressId,
        dateStr = _this$data.dateStr,
        timeStr = _this$data.timeStr;

    if (!timeDesc) {
      return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请选择取件时间');
    }

    if (!addressId) {
      return Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('请选择取件地址');
    }

    var tt = timeStr.split('-')[0];
    var time = dateStr + " " + tt + ":00";
    this.lock = true;
    vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"].loading('预约中...');

    if (this.edit) {
      return Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])(_extends({}, utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back_cancel, {
        id: this.id
      })).then(function () {
        return Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])(_extends({}, utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back, {
          id: _this.id
        }), {
          recomanded_post_back_address_id: _this.data.addressId,
          recomanded_post_back_time: time
        });
      }).then(function () {
        Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('预约成功');
        setTimeout(function () {
          _this.lock = false;
          wx.navigateBack();
        }, 1500);
      }).catch(function (err) {
        _this.lock = false;
        Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message || err.msg || err || '预约失败');
      });
    }

    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])(_extends({}, utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].pre_post_back, {
      id: this.id
    }), {
      recomanded_post_back_address_id: this.data.addressId,
      recomanded_post_back_time: time
    }).then(function () {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('预约成功');
      setTimeout(function () {
        _this.lock = false;
        wx.navigateBack();
      }, 1500);
    }).catch(function (err) {
      _this.lock = false;
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message || err.msg || err || '预约失败');
    });
  },
  navToAddress: function navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index?select=1'
    });
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