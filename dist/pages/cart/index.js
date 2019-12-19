/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/cart/index.js",
Object.assign(require("././../../commons.js").modules, {

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/dialog/dialog.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/dialog/dialog.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let queue = [];
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
const Dialog = options => {
    options = Object.assign(Object.assign({}, Dialog.currentOptions), options);
    return new Promise((resolve, reject) => {
        const context = options.context || getContext();
        const dialog = context.selectComponent(options.selector);
        delete options.context;
        delete options.selector;
        if (dialog) {
            dialog.setData(Object.assign({ onCancel: reject, onConfirm: resolve }, options));
            queue.push(dialog);
        }
        else {
            console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
        }
    });
};
Dialog.defaultOptions = {
    show: true,
    title: '',
    width: null,
    message: '',
    zIndex: 100,
    overlay: true,
    selector: '#van-dialog',
    className: '',
    asyncClose: false,
    transition: 'scale',
    customStyle: '',
    messageAlign: '',
    overlayStyle: '',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
    confirmButtonOpenType: ''
};
Dialog.alert = Dialog;
Dialog.confirm = options => Dialog(Object.assign({ showCancelButton: true }, options));
Dialog.close = () => {
    queue.forEach(dialog => {
        dialog.close();
    });
    queue = [];
};
Dialog.stopLoading = () => {
    queue.forEach(dialog => {
        dialog.stopLoading();
    });
};
Dialog.setDefaultOptions = options => {
    Object.assign(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = () => {
    Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);
};
Dialog.resetDefaultOptions();
/* harmony default export */ __webpack_exports__["default"] = (Dialog);


/***/ }),

/***/ "./src/pages/cart/index.js":
/*!*********************************!*\
  !*** ./src/pages/cart/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/image */ "./src/utils/image.js");
/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/api */ "./src/utils/api.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js");
/* harmony import */ var vant_weapp_dist_dialog_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant-weapp/dist/dialog/dialog */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/dialog/dialog.js");
/* harmony import */ var utils_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! utils/config */ "./src/utils/config.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var app = getApp();
Component({
  properties: {
    productList: {
      type: Array,
      value: [{
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      }, {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      }, {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      }, {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      }],
      observer: function observer(value) {
        var selectAll = true;
        value.forEach(function (item) {
          if (!item.isSelected) {
            selectAll = false;
          }
        });
        this.setData({
          selectAll: selectAll
        });
      }
    },
    orderProductList: {
      type: Array,
      value: []
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    totalOriginPrice: {
      type: Number,
      value: 0
    },
    orderId: {
      type: String,
      value: ''
    }
  },
  data: {
    selected: '/slice/Productlist/list_selected.png',
    unselected: '/slice/Productlist/list_unselected.png',
    vip: '/slice/membership/membership.png',
    icon1: Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/Productlist/list_all.png'),
    icon2: Object(utils_image__WEBPACK_IMPORTED_MODULE_0__["getImageUrl"])('slice/Productlist/list_all_unselected.png'),
    show: false,
    selectAll: true,
    assetsUrl: utils_config__WEBPACK_IMPORTED_MODULE_4__["default"].assetsUrl
  },
  methods: {
    selectOne: function selectOne(e) {
      var index = e.currentTarget.dataset.index;
      this.index = index; // 记录当前点击的商品

      if (this.data.productList[index].isSelected) {
        this.setData({
          show: true
        });
        this.remark = '';
        this.setData({
          selectedReasons: [false, false, false, false]
        });
      } else {
        this.triggerEvent('select-one', {
          index: index
        });
      }
    },
    toggleActionSheet: function toggleActionSheet() {
      this.setData({
        show: false
      });
    },
    onSelectAll: function onSelectAll() {
      if (!this.data.selectAll) {
        this.triggerEvent('select-all');
      }

      this.setData({
        selectAll: !this.data.selectAll
      });
    },
    reasonInput: function reasonInput(e) {
      this.remark = e.detail.value;
    },
    toggleReason: function toggleReason(e) {
      var index = e.currentTarget.dataset.index;
      var selectedReasons = this.data.selectedReasons;
      selectedReasons[index] = !selectedReasons[index];
      this.setData({
        selectedReasons: selectedReasons
      });
    },
    confirmBack: function confirmBack() {
      var _this$data = this.data,
          selectedReasons = _this$data.selectedReasons,
          reasons = _this$data.reasons;
      var reason = '';
      selectedReasons.forEach(function (i, index) {
        if (i) {
          reason = !reason ? reasons[index] : reason + ";" + reasons[index];
        }
      });
      this.setData({
        show: false,
        selectAll: false
      });
      this.triggerEvent('confirm-back', {
        index: this.index,
        reason: reason,
        remark: this.remark
      });
    },
    onClickBuy: function onClickBuy() {
      var _this$data2 = this.data,
          productList = _this$data2.productList,
          orderProductList = _this$data2.orderProductList,
          totalPrice = _this$data2.totalPrice,
          totalOriginPrice = _this$data2.totalOriginPrice,
          orderId = _this$data2.orderId;
      var orderInfo = {
        productList: productList,
        orderProductList: orderProductList,
        totalPrice: totalPrice,
        totalOriginPrice: totalOriginPrice,
        orderId: orderId
      };
      app.globalData.orderInfo = orderInfo;
      wx.navigateTo({
        url: '/packages/order/index'
      });
    },
    onClickAllBack: function onClickAllBack() {
      var _this = this;

      vant_weapp_dist_dialog_dialog__WEBPACK_IMPORTED_MODULE_3__["default"].confirm({
        message: '确定全部寄回吗？'
      }).then(function () {
        Object(utils_api__WEBPACK_IMPORTED_MODULE_1__["request"])(_extends({}, utils_api__WEBPACK_IMPORTED_MODULE_1__["api"].pay_nothing, {
          id: _this.data.orderId
        })).then(function () {
          if (getCurrentPages().length != 0) {
            getCurrentPages()[getCurrentPages().length - 1].onShow();
          }
        }).catch(function () {
          Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_2__["default"])('请求失败');
        });
      }).catch(function () {});
    }
  }
});

/***/ })

/******/ }));