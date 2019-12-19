const app = getApp();

Page({
  data: {
    productList: [
      {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      },
      {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      },
      {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      },
      {
        isSelected: false,
        front_image_url: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/1iaDglTRObbzqnXL.jpg',
        name: 'test',
        brandname: '祖马龙',
        qiaqia_price: 10,
        retail_price: 20
      },
    ],
    vip: '/slice/membership/membership.png',
    price: 0,
    couponId: '123123',
    coupon: null,
    userNote: '',
  },

  onLoad() {
    console.log(app.globalData.orderInfo);
    const {
      productList, orderProductList, totalPrice, totalOriginPrice, orderId
    } = app.globalData.orderInfo;
    this.orderProductList = orderProductList;
    this.setData({
      id: orderId,
      productList,
      totalOriginPrice,
      totalPrice,
      price: totalPrice,
    });
  },

  onShow() {
    if (app.globalData.isSetCoupon === true) {
      app.globalData.isSetCoupon = false
      this.setData({
        couponId: app.globalData.coupon.id,
        coupon: app.globalData.coupon,
      })
    }
    if (this.data.coupon && this.data.totalPrice) {
      const { type, amount, discount } = this.data.coupon
      let { totalPrice, price } = this.data
      price = totalPrice
      if (type === 1) {
        price = price * discount / 100
      } else {
        price -= amount
      }
      if (price < 0) {
        price = 0
      }
      this.setData({ price })
    }
  },

  bindReplaceInput(e) {
    this.setData({ userNote: e.detail.value })
  },

  navToCounpon() {
    wx.navigateTo({ url: '/packages/wallet/index?select=1' });
  },

  onClickBuy() {
    console.log('准备支付： ', this.orderProductList);
  },

})
