/******/ var webpackRequire = require("././../../webpack-require");
/******/ webpackRequire(
"./src/packages/membership/index.js",
Object.assign(require("././../commonchunks.js").modules, require("././../../commons.js").modules, {

/***/ "./src/packages/membership/index.js":
/*!******************************************!*\
  !*** ./src/packages/membership/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/api */ "./src/utils/api.js");
/* harmony import */ var vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant-weapp/dist/toast/toast */ "./node_modules/_vant-weapp@0.5.23@vant-weapp/dist/toast/toast.js");


const app = getApp();
Page({
  data: {
    imgUrls: [// 'http://static.wx.qiaqiabox.com/slice/membership/halfyear.png',
    'http://static.wx.qiaqiabox.com/slice/membership/chuzhi2.png'],
    titles: [// '开通会员，立享体验',
    '立享体验'],
    titles2: [// 'TRY IT NOW',
    'JOIN THE VIP CLUB'],
    originPrice: 9.9,
    price: 9.9,
    type: 12,
    code: '',
    cardType: [{
      type: 12,
      price: 9.9
    }],
    current: 0
  },

  onLoad() {// request(api.info)
    //   .then(res => {
    //     if (res.user.status === 2 || res.user.status === 4) {
    //       wx.switchTab({ url: '/pages/box/index' })
    //     }
    //   })
  },

  onShow() {
    if (app.globalData.isSetCoupon === true) {
      app.globalData.isSetCoupon = false;
      this.setData({
        coupon: app.globalData.coupon
      });
    }
  },

  bindChange(e) {
    var current = e.detail.current;
    this.setData({
      current,
      type: this.data.cardType[current].type,
      price: this.data.cardType[current].price,
      originPrice: this.data.cardType[current].price
    });
  },

  bindCodeChange(e) {
    this.setData({
      code: e.detail.value
    });
  },

  applyCode() {
    if (!this.data.code) {
      return;
    }

    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])({
      id: '?code=' + this.data.code,
      ...utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].get_coupon_for_subscribe
    }, {
      subscription_type: this.data.type,
      code: this.data.code
    }).then(res => {
      console.log(res.coupon_for_subscribe);
      const {
        originPrice
      } = this.data;
      this.setData({
        price: originPrice * res.coupon_for_subscribe.discount / 100
      });
    }).catch(err => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message);
    });
  },

  bindUseCode() {},

  payMember() {
    Object(utils_api__WEBPACK_IMPORTED_MODULE_0__["request"])({ ...utils_api__WEBPACK_IMPORTED_MODULE_0__["api"].subscribe_pay
    }, {
      subscription_type: this.data.type,
      code: this.data.code
    }).then(res => {
      let result = res.payArgs;
      wx.requestPayment({
        timeStamp: result.timeStamp,
        nonceStr: result.nonceStr,
        package: result.package,
        signType: result.signType,
        paySign: result.paySign,

        success(res) {
          if (res) {
            wx.redirectTo({
              url: '/packages/success/index'
            });
          }
        },

        fail() {
          Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])('微信支付失败');
        }

      });
    }).catch(err => {
      Object(vant_weapp_dist_toast_toast__WEBPACK_IMPORTED_MODULE_1__["default"])(err.message || err.msg || '????');
      setTimeout(() => {
        this.handleError(err);
      }, 2000);
    });
  },

  handleError(err) {
    if (err.message === '请先填写问卷') {
      // ??????
      wx.switchTab({
        url: '/pages/question/index'
      });
    } else if (err.message === '用户已经处于订阅状态，暂时不支持续费') {
      wx.switchTab({
        url: '/pages/box/index'
      });
    }
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