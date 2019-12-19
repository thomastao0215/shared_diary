import { fetchData } from './api';

Page({
  data: {
    tabs: [
      '小香推荐💍',
      '上学必备🎒',
      '约会🌹',
      '仙女🧚‍♀️',
    ],
    articles: [
    ],
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
    ]

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
