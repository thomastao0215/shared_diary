/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/pages/my/index.js",
{

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js ***!
  \*******************************************************************************/
/*! exports provided: isDef, isObj, isNumber, range, nextTick, getSystemInfoSync, addUnit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return isDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObj", function() { return isObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextTick", function() { return nextTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemInfoSync", function() { return getSystemInfoSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addUnit", function() { return addUnit; });
function isDef(value) {
    return value !== undefined && value !== null;
}
function isObj(x) {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}
function isNumber(value) {
    return /^\d+(\.\d+)?$/.test(value);
}
function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function nextTick(fn) {
    setTimeout(() => {
        fn();
    }, 1000 / 30);
}
let systemInfo = null;
function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
function addUnit(value) {
    if (!isDef(value)) {
        return undefined;
    }
    value = String(value);
    return isNumber(value) ? `${value}px` : value;
}


/***/ }),

/***/ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/common/utils.js");

const defaultOptions = {
    type: 'text',
    mask: false,
    message: '',
    show: true,
    zIndex: 1000,
    duration: 2000,
    position: 'middle',
    forbidClick: false,
    loadingType: 'circular',
    selector: '#van-toast'
};
let queue = [];
let currentOptions = Object.assign({}, defaultOptions);
function parseOptions(message) {
    return Object(_common_utils__WEBPACK_IMPORTED_MODULE_0__["isObj"])(message) ? message : { message };
}
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
function Toast(toastOptions) {
    const options = Object.assign(Object.assign({}, currentOptions), parseOptions(toastOptions));
    const context = options.context || getContext();
    const toast = context.selectComponent(options.selector);
    if (!toast) {
        console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
        return;
    }
    delete options.context;
    delete options.selector;
    toast.clear = () => {
        toast.setData({ show: false });
        if (options.onClose) {
            options.onClose();
        }
    };
    queue.push(toast);
    toast.setData(options);
    clearTimeout(toast.timer);
    if (options.duration > 0) {
        toast.timer = setTimeout(() => {
            toast.clear();
            queue = queue.filter(item => item !== toast);
        }, options.duration);
    }
    return toast;
}
const createMethod = (type) => (options) => Toast(Object.assign({ type }, parseOptions(options)));
Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.fail = createMethod('fail');
Toast.clear = () => {
    queue.forEach(toast => {
        toast.clear();
    });
    queue = [];
};
Toast.setDefaultOptions = (options) => {
    Object.assign(currentOptions, options);
};
Toast.resetDefaultOptions = () => {
    currentOptions = Object.assign({}, defaultOptions);
};
/* harmony default export */ __webpack_exports__["default"] = (Toast);


/***/ }),

/***/ "./src/pages/my/index.js":
/*!*******************************!*\
  !*** ./src/pages/my/index.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@1.0.0-beta.4@vant-weapp/dist/toast/toast.js");

Page({
  data: {
    userInfo: {
      nickName: '点击头像登陆'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    default_avatarUrl: 'https://cloud-minapp-25663.cloud.ifanrusercontent.com/1hEl1dExlftTcM6M.jpg',
    joinDate: 0
  },
  // 事件处理函数
  switchToBox: function switchToBox() {
    wx.switchTab({
      url: '../box/index'
    });
  },
  Subs: function Subs() {
    wx.setClipboardData({
      data: 'public_account',
      success: function success() {
        wx.getClipboardData({
          success: function success() {
            wx.hideToast({
              complete: function complete() {
                Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_0__["default"])('公众号已复制，前往微信顶部搜索框粘贴搜索');
              }
            });
          }
        });
      }
    });
  },
  onLoad: function onLoad() {
    // 获取 user 信息
    var userInfo = wx.BaaS.storage.get('userinfo'); // zx.get('user', 'me').then(res => {
    //   console.log(res);
    // });

    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
  },
  navToWallet: function navToWallet() {
    wx.navigateTo({
      url: '/packages/wallet/index'
    });
  },
  getPhoneNumber: function getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
  },
  navToBox: function navToBox() {
    wx.switchTab({
      url: '/pages/box/index'
    });
  },
  navToInvite: function navToInvite() {
    wx.navigateTo({
      url: '/packages/invite/index'
    });
  },
  navToAddress: function navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index'
    });
  },
  navToOrders: function navToOrders() {
    wx.navigateTo({
      url: '/packages/orders/index?userId=' + this.data.userInfo.id
    });
  }
});

/***/ })

/******/ });