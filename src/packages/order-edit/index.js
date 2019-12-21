import { api, request } from 'utils/api';
import Toast from 'vant-weapp/dist/toast/toast';


const app = getApp();

function fix2(value) {
  return value < 10 ? '0' + value : value;
}

Page({
  data: {
    DateTitle: '预定寄盒日期',
    AddressTitle: '小香将寄往…',
    typeTitle: '这次想试戴的品类',
    needTitle: '还有需求，悄悄告诉我:',
    endTitle: '',
    addressId: '',
    addressInfo: '',
    date: '',
    otherNeed: '',
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
    const endTitle = this.edit ? '定制爱戴小盒，还有一步之遥！' : '预约新的爱戴小盒！';
    this.setData({ endTitle });
    if (this.edit) {
      request(api.order_box)
        .then(res => {
          const { order } = res;
          this.id = order.id;
          const {
            recomanded_send_time: date = '',
            user_note: otherNeed = '',
            preferred_product_type: types,
            send_address_id: addressId
          } = order;
          const {
            province, city, county, address, name, phone
          } = order.send_address_id__user_address;
          const d = new Date(date);
          const dd = fix2(d.getFullYear()) + fix2(d.getMonth() + 1) + fix2(d.getDate());
          const [...copyTryTypes] = this.data.tryTypes;
          const map = ['耳环', '项链', '戒指', '手链'];
          types && types.split('、').forEach(item => {
            const index = map.indexOf(item);
            copyTryTypes[index].active = true;
          });
          this.setData({
            addressInfo: {
              name,
              phone,
              address: province + city + county + address
            },
            addressId,
            tryTypes: copyTryTypes,
            date: dd,
            otherNeed
          });
        });
    } else { // 预约新的小盒
      request(api.survey_info)
        .then(res => {
          if (res.survey.state) {
            const list = res.survey.survey_tag_list;
            const state = JSON.parse(res.survey.state);
            this.list = list;
            this.state = state;
          }
        })
        .catch(err => {
          Toast(err.message);
          setTimeout(() => {
            wx.switchTab({ url: '/pages/question/index' });
          }, 1500);
        });
    }
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
      date, addressId, otherNeed, tryTypes
    } = this.data;

    if (!date) {
      return Toast('请选择日期');
    }
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
    const submitDate = [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)].join('-');
    let tryTypesResult = '';
    tryTypes.forEach(item => {
      if (item.active) {
        tryTypesResult += (item.text + '、');
      }
    });
    tryTypesResult = tryTypesResult.slice(0, -1);

    if (this.edit) { // 编辑
      request({
        ...api.order_update,
        id: this.id
      }, {
        send_address_id: addressId,
        recomanded_send_time: submitDate,
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
      this.list[23].value = submitDate;
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

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
