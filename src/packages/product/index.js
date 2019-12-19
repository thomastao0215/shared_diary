// 获取应用实例
import {
  fetchData, fetchSku
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
    showModal: false,
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
    show: false,
    recommandation: [
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
      {
        img_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',
        title: '香水',
        price: 100
      },
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
          show: false,
          info_images: data.info_images,
          sku_group: data.sku_group
        });
        fetchSku(data.id)
          .then(res => {
            this.setData({
              sku_list: res.data.objects
            });
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
  onClickBuy() {
    if (this.data.sku_list) {
      this.setData({
        operation: '立即购买',
        show: true
      });
    }
  },
  onClickCart() {
    if (this.data.sku_list) {
      this.setData({
        operation: '加入购物车',
        show: true
      });
    }
  },
  showPopup() {
    this.setData({ show: true });
  },
  showSheet(value) {
    this.setData({
      'sheet.show': value
    });
  },
  showShareImageModal() {
    this.setData({
      showModal: true
    });
  },
  closeActionSheet() {
    this.setData({
      'sheet.show': false
    });
    this.triggerEvent('finished');
  },
  closeShareImageModal() {
    this.setData({
      showModal: false
    });
  },
  handleActionClick(e) {
    if (e.detail.openType === 'share') return;

    wx.showLoading({ title: '正在生成' });
    this.setData({
      showCanvas: true
    }, this.draw.bind(this));
  },
  draw() {
    this.loadShopInfo()
      .then(this.loadShareSettings.bind(this))
      .then(this.loadFeatureImage.bind(this))
      .then(this.drawQrCode.bind(this))
      .then(this.createPosterTempPath.bind(this))
      .then(src => {
        this.setData({
          src,
          showModal: true,
          showCanvas: false
        }, () => {
          this.triggerEvent('finished');
        });
      })
      .catch(() => {
        this.setData({ showCanvas: false });
        this.closeShareImageModal();
        this.closeActionSheet();
      });
  },
  onShareAppMessage() {
    return {
      title: '我发现了一个好东西',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }

});
