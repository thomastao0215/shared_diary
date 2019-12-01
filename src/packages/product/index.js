// 获取应用实例
import {
  fetchData
} from './api';

Page({
  data: {
    product_id: '',
    title: '',
    description: '',
    cover_image: '',
    images: [],
    status: '',
    priority: 100,
    sold_count: 100,
    brief_title: '',
    brand: {
      brand_name: '',
      brand_origin: '',
      brand_info: '',
      brand_logo: '',
      brand_name_zh: ''
    },
    info_images: [],
    gallery: [
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png'
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png'
      }
    ],
    show: true,
    recommandation: [
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
        title: '日式软沙发',
        price: 100
      },
      {
        img_url: 'http://yanxuan.nosdn.127.net/e6feb5f4a0989d212bce068d4907657d.jpg',
        title: '日式软沙发',
        price: 100
      }
    ]
  },


  onLoad(query = {}) {
    const { productId } = query;
    wx.showLoading({
      title: '加载中'
    });
    fetchData(productId)
      .then(res => {
        const { data } = res;
        console.log(data);
        this.setData({
          product_id: data.id,
          title: data.title,
          description: data.description,
          cover_image: data.cover_image,
          status: data.status,
          sold_count: data.sold_count,
          images: data.images,
          brief_title: data.brief_title,
          brand: data.brand,
          info_images: data.info_images
        });
        wx.hideLoading();
      });
  },
  onClose() {
    var show = !this.data.show;
    this.setData({
      show
    });
  },
  showPopup() {
    this.setData({ show: true });
  },


});
