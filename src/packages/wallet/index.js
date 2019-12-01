import { api, request } from 'utils/api';
import util from 'utils/util';
import Toast from 'vant-weapp/dist/toast/toast';
import { filterFetchData } from './utils';

const isIphoneX = util.isIphoneX();
const app = getApp();

Page({
  data: {
    originCouponList: [],
    couponList: [],
    isIphoneX,
    fetchCode: '',
  },

  onLoad(query = {}) {
    this.init();
    if (query.select) {
      this.select = true;
    }
  },

  init() {
    this.fetchLock = false;
    Toast.loading('加载中...');
    request(api.coupon_list)
      .then(res => {
        const couponList = filterFetchData(res.coupon_list);
        this.setData({
          couponList,
          fetchCode: '',
          originCouponList: res.coupon_list
        });
        Toast.clear();
      });
  },

  onFetchCodeInput(e) {
    this.setData({ fetchCode: e.detail });
  },

  onClickFetchCoupon() {
    if (this.fetchLock) {
      return;
    }
    if (!this.data.fetchCode) {
      return Toast('请输入兑换码');
    }
    this.fetchLock = true;
    Toast.loading('兑换中...');
    request(api.coupon_exchange, {
      code: this.data.fetchCode
    })
      .then(() => {
        Toast('兑换成功');
        this.init();
      })
      .catch(err => {
        Toast(err.message || err.msg || '兑换失败');
        this.fetchLock = false;
      });
  },

  onClickCoupon(e) {
    if (!this.select) {
      return;
    }
    const { index } = e.currentTarget.dataset;
    app.globalData.isSetCoupon = true;
    app.globalData.coupon = this.data.originCouponList[index];
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
