import Config from 'utils/config';
import { fetchData } from './api';


Page({
  data: {
    productList: [],
    vip: '/slice/membership/membership.png',
    price: 0,
    couponId: '',
    coupon: null,
    userNote: '',
    assetsUrl: Config.assetsUrl
  },

  onSearch(e) {
    // console.log('搜索内容:' + e.detail)
    this.query.keyWord = e.detail;
    wx.showLoading({
      title: '加载中'
    });
    this.query.offset = 0;
    this.finished = false;
    fetchData(this.query).then(res => {
      console.log(res.data.objects);
      this.setData({
        positions: res.data.objects
      });
      wx.hideLoading();
    });
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },
  onLoad() {


  },

});
