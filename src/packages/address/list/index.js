import { getImageUrl } from 'utils/image';
import zx from 'weapp-zx';
import Toast from 'vant-weapp/dist/toast/toast';
import { fetchData } from './api';

const app = getApp();

Page({
  data: {
    icon1: '',
    icon2: '',
    userAddressList: []
  },

  onLoad(query = {}) {
    const icon1 = getImageUrl('slice/location/icon_location.png');
    const icon2 = getImageUrl('slice/location/icon_newlocation.png');
    this.setData({ icon1, icon2 });
    this.init();
    if (query.select) {
      this.select = true;
    }
  },


  onShow() {
    if (app.globalData.refreshAddressList) {
      this.init();
      app.globalData.refreshAddressList = false;
    }
  },

  init() {
    this.limit = 20;
    this.offset = 0;
    this.fetching = false;
    this.finished = false;
    this.fetchAddress('fetch');
  },
  fetchAddress(type = 'fetch') {
    if (type === 'fetch') {
      this.offset = 0;
      this.finished = false;
    }
    this.fetching = true;
    type === 'fetch' && wx.showLoading({ title: '加载中...' });
    fetchData({
      limit: this.limit,
      offset: this.offset,
    }).then(res => {
      let data = res.data.objects || [];
      if (data.length < this.limit) {
        this.finished = true;
      } else {
        this.offset += this.limit;
      }
      const { address } = this.data;
      const userAddressList = type === 'fetch' ? [...data] : [...address, ...data];
      this.fetching = false;
      this.setData({ userAddressList });
      type === 'fetch' && wx.hideLoading();
    });
  },

  onEdit(e) {
    const { address } = e.target.dataset;
    wx.navigateTo({ url: '/packages/address/edit/index?address=' + JSON.stringify(address) });
  },

  onDelete(e) {
    const { address } = e.target.dataset;
    const { id } = address;
    zx.update('address', id, { is_delete: 1 })
      .then(() => {
        Toast.success({ message: '删除成功' });
        this.init();
      })
      .catch(err => {
        Toast.fail({ message: err.message || err.msg || '删除' });
      });
  },

  onCreate() {
    wx.navigateTo({ url: '/packages/address/edit/index' });
  },

  onClickAddress(e) {
    if (!this.select) {
      return;
    }
    const { address } = e.target.dataset;
    const {
      province, city, county, address: addr, phone, name, id
    } = address;
    const addressStr = province + city + county + addr;
    const addressId = id;
    const addressInfo = {
      name,
      phone,
      address: addressStr,
    };
    app.globalData.isSetAddress = true;
    app.globalData.addressId = addressId;
    app.globalData.addressInfo = addressInfo;
    wx.navigateBack();
  },

  onShareAppMessage() {
    return {
      title: '??????????!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
