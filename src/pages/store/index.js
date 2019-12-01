import { fetchData } from './api';

Page({
  data: {
    banner: [
      {
        image_url: 'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0'
      },
      {
        image_url: 'https://yanxuan.nosdn.127.net/baea18aa59217cabd190b19fc1cf1617.jpg?imageView&quality=75&thumbnail=750x0'
      },
      {
        image_url: 'https://yanxuan.nosdn.127.net/d5683f01e132851229be21c52d808b62.jpg?imageView&quality=75&thumbnail=750x0'
      },
      {
        image_url: 'https://yanxuan.nosdn.127.net/af7d906e174cb160ab5a979310aa223d.jpg?imageView&quality=75&thumbnail=750x0'
      }
    ],
    tabs: [
      '小香推荐💍',
      '稀释专区🎒',
      '约会🌹',
      '仙女🧚‍♀️',
    ],
    tag: '',
    tabs_id: [
      '5dde4b3bca0da80f4b2e5f40',
      '5dde4b66ca0da80f472e6368'
    ],
    products: [
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iZoGmxtyXMRAIzx.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '日式软沙发',
        price: 100
      }
    ]

  },
  onReachBottom() {
    if (this.fetching || this.finished) {
      return;
    }
    this.fetchJobs('loadmore');
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
    this.fetching = false;
    this.finished = false;
    this.query = {
      limit: 10,
      offset: 0,
      keyWord: '',
      tag: this.data.tag
    };
    this.fetchJobs('fetch');
  },
  onPullDownRefresh() {
    this.init();
    wx.stopPullDownRefresh();
  },

  fetchJobs(type = 'fetch') {
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
      const { products } = this.data;
      const newProdcuts = type === 'fetch' ? [...data] : [...products, ...data];
      this.fetching = false;
      this.setData({ products: newProdcuts });
      type === 'fetch' && wx.hideLoading();
    });
  },
  bindTabChange(e) {
    var current = e.detail.index;
    this.setData({
      tag: this.data.tabs_id[current]
    });
  },
  navToDetail(e) {
    console.log(e);
    wx.navigateTo({
      url: '/packages/product/index'
    });
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },
  onLoad() {
    this.init();
  }

});
