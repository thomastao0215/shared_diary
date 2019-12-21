import { fetchData } from './api';


Page({
  data: {
    tabs: [
      '全部订单',
      '待付款',
      '待发货',
      '待收货',
      '待评价',
    ],
    orders: [
    ],
    tabs_id: [
      '全部订单',
      '待付款',
      '待发货',
      '待收货',
      '待评价',
    ],
    stauts: 0

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
  init() {
    if (this.data.userId) {
      this.fetching = false;
      this.finished = false;
      this.query = {
        limit: 10,
        offset: 0,
        userId: this.data.userId,
      };
      if (this.data.stauts != 0) {
        this.query.stauts = this.data.stauts;
      }

      this.fetchOrders('fetch');
    }
  },
  fetchOrders(type = 'fetch') {
    if (type === 'fetch') {
      this.query.offset = 0;
      this.finished = false;
    }
    this.fetching = true;
    type === 'fetch' && wx.showLoading({ title: '加载中...' });
    fetchData(this.query).then(res => {
      let data = res.data.objects || [];
      if (data.length < this.query.limit) {
        this.finished = true;
      } else {
        this.query.offset += this.query.limit;
      }
      const { orders } = this.data;
      const newOrders = type === 'fetch' ? [...data] : [...orders, ...data];
      this.fetching = false;
      this.setData({ orders: newOrders });
      type === 'fetch' && wx.hideLoading();
    });
  },
  bindTabChange(e) {
    var current = e.detail.index;
    this.setData({
      status: this.data.tabs[current]
    });
    wx.showLoading({
      title: '加载中'
    });
    this.query.offset = 0;
    this.finished = false;
    if (this.data.status !== '全部订单') {
      this.query.status = this.data.status;
    }
    fetchData(this.query).then(res => {
      this.setData({
        orders: res.data.objects
      });
      wx.hideLoading();
    });
  },
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },
  onLoad(e) {
    this.setData({
      userId: Number(e.userId)
    });
    this.init();
  },

});
