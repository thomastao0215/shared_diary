import { api, request } from 'utils/api';
import Toast from 'vant-weapp/dist/toast/toast';


const app = getApp();


Page({
  data: {
    AddressTitle: '小香将寄往…',
    addressId: '',
    addressInfo: '',
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
    ],
    vip: '/slice/membership/membership.png',
    address: {

    },
    price: 0,
    couponId: '123123',
    coupon: null,
    userNote: '',
  },

  onLoad(query = {}) {
    this.edit = !!query.edit;
  },

  onShow() {
    if (app.globalData.isSetAddress === true) {
      const addressId = app.globalData.addressId;
      const addressInfo = app.globalData.addressInfo;
      console.log(addressInfo);
      this.setData({ addressId, addressInfo });
      app.globalData.isSetAddress === false;
    }
  },

  onClickDate(e) {
    const date = e.detail;
    this.setData({ date });
  },

  onClickAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index?select=1'
    });
  },

  onClickTryType(e) {
    const [...copyTryTypes] = this.data.tryTypes;
    const { choose } = e.target.dataset;
    let count = 0;
    let index = -1;
    for (let i = 0; i < copyTryTypes.length; i++) {
      if (copyTryTypes[i].active) {
        count++;
        index = i;
      }
    }
    if (count === 1 && index === choose) {
      return;
    }
    copyTryTypes[choose].active = !copyTryTypes[choose].active;
    this.setData({ tryTypes: copyTryTypes });
  },

  onInput(e) {
    this.setData({ otherNeed: e.detail });
  },

  onClickSubmit() {
    if (this.lock) {
      return;
    }
    const {
      addressId, otherNeed, tryTypes
    } = this.data;


    if (!addressId) {
      return Toast('请选择地址');
    }
    let count = 0;
    tryTypes.forEach(item => {
      if (item.active) {
        count++;
      }
    });
    if (!count) {
      return Toast('请选择想试戴的品类');
    }
    this.lock = true;
    Toast.loading('提交中...');
    let tryTypesResult = '';

    if (this.edit) { // 编辑
      request({
        ...api.order_update,
        id: this.id
      }, {
        send_address_id: addressId,
        preferred_product_type: tryTypesResult,
        user_note: otherNeed
      })
        .then(() => {
          Toast.success('提交成功');
          wx.setStorageSync('questionState', null);
          this.lock = false;
          wx.switchTab({
            url: '/pages/box/index'
          });
        })
        .catch(err => {
          Toast(err.message || err.msg || err || '提交失败');
          this.lock = false;
        });
    } else { // 新建
      // state 数据刷新
      this.state.date = this.data.date;
      this.state.tryTypes = this.data.tryTypes;
      this.state.addressId = addressId;
      this.state.addressInfo = this.data.addressInfo;
      this.state.otherNeed = otherNeed;

      // 问卷数据刷新
      this.list[22].value = addressId;
      this.list[24].value = tryTypesResult;
      this.list[25].value = otherNeed;

      request(api.survey_submit, {
        state: JSON.stringify(this.state),
        survey_tag_list: this.list
      })
        .then(() => {
          Toast.success('提交成功');
          this.lock = false;
          wx.setStorageSync('questionState', null);
          request(api.info)
            .then(res => {
              if (res.user.status === 2 || res.user.status === 4) {
                wx.switchTab({ url: '/pages/box/index' });
              } else {
                wx.navigateTo({
                  url: '/packages/membership/index'
                });
              }
            })
            .catch(err => {
              Toast(err.message || '获取用户数据失败');
            });
        })
        .catch(err => {
          Toast(err.message || err.msg || err || '提交失败');
          this.lock = false;
        });
    }
  },
});
