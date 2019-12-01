import { api, request } from 'utils/api';
import Toast from 'vant-weapp/dist/toast/toast';
import {
  getItems, checkSelectTime, getDateStr, getWeekStr, getTimeStr
} from './utils';

const app = getApp();

Page({
  data: {
    show: false,
    mainActiveIndex: 0,
    activeId: -1,
    timeDesc: '',
    dateStr: '',
    timeStr: '',
    weekStr: '',
    addressId: ''
  },

  onLoad(query = {}) {
    const { id, time = '', address = '' } = query;
    this.id = id;
    this.lock = false;
    this.edit = !!time;
    if (this.edit) {
      const d = new Date(time);
      const addr = JSON.parse(address);
      const weekStr = getWeekStr(0, d);
      const timeStr = getTimeStr(d);
      const dateStr = getDateStr(0, d);
      const addressId = addr.id;
      const timeDesc = dateStr + ' ' + weekStr + ' ' + timeStr;
      const addressInfo = {};
      addressInfo.name = addr.name;
      addressInfo.phone = addr.phone;
      addressInfo.address = addr.address_name + ' ' + addr.address;
      this.setData({
        weekStr,
        timeStr,
        dateStr,
        addressId,
        timeDesc,
        addressInfo
      });
    }
  },

  onShow() {
    this.setData({ items: getItems() });
    if (app.globalData.isSetAddress === true) {
      const addressId = app.globalData.addressId;
      const addressInfo = app.globalData.addressInfo;
      this.setData({
        addressId,
        addressInfo
      });
      app.globalData.isSetAddress = false;
    }
  },

  onSelectTime() {
    this.setData({ show: true });
  },

  checkTime() {
    const day = Number(this.data.dateStr.split('-').join(''));
    const time = Number(this.data.timeStr.split(':')[0]);
    if (!checkSelectTime(day, time)) {
      Toast('请重新选择时间');
      const items = getItems();
      this.setData({
        items,
        timeDesc: '',
        dateStr: '',
        timeStr: '',
        weekStr: '',
        mainActiveIndex: 0,
        activeId: -1,
      });
      return false;
    }
    return true;
  },

  onClose() {
    this.setData({ show: false });
    this.checkTime();
  },

  onClickNav(e) {
    this.setData({
      mainActiveIndex: e.detail.index
    });
  },

  onClickItem(e) {
    const {
      id: activeId, dateStr, timeStr, weekStr
    } = e.detail;
    this.setData({
      activeId,
      dateStr,
      timeStr,
      weekStr,
      timeDesc: `${dateStr} ${weekStr} ${timeStr}`
    });
  },

  onClickConfirm() {
    if (this.lock) return;
    if (!this.checkTime()) return;
    const {
      timeDesc, addressId, dateStr, timeStr
    } = this.data;
    if (!timeDesc) {
      return Toast('请选择取件时间');
    }
    if (!addressId) {
      return Toast('请选择取件地址');
    }
    const tt = timeStr.split('-')[0];
    const time = `${dateStr} ${tt}:00`;
    this.lock = true;
    Toast.loading('预约中...');

    if (this.edit) {
      return request({
        ...api.pre_post_back_cancel,
        id: this.id
      })
        .then(() => {
          return request({
            ...api.pre_post_back,
            id: this.id,
          }, {
            recomanded_post_back_address_id: this.data.addressId,
            recomanded_post_back_time: time
          });
        })
        .then(() => {
          Toast('预约成功');
          setTimeout(() => {
            this.lock = false;
            wx.navigateBack();
          }, 1500);
        })
        .catch(err => {
          this.lock = false;
          Toast(err.message || err.msg || err || '预约失败');
        });
    }

    request({
      ...api.pre_post_back,
      id: this.id,
    }, {
      recomanded_post_back_address_id: this.data.addressId,
      recomanded_post_back_time: time
    })
      .then(() => {
        Toast('预约成功');
        setTimeout(() => {
          this.lock = false;
          wx.navigateBack();
        }, 1500);
      })
      .catch(err => {
        this.lock = false;
        Toast(err.message || err.msg || err || '预约失败');
      });
  },

  navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index?select=1'
    });
  },

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
