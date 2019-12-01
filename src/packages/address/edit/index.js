
import Toast from 'vant-weapp/dist/toast/toast';
import { createAddress, updateAddress } from './api';
import areaList from './area';

const app = getApp();

Page({
  data: {
    areaList,
    isDefault: false,
    showSelectArea: false,
    address: {
      addressName: '',
      company: '',
      province: '',
      city: '',
      county: '',
      address: '',
      name: '',
      phone: '',
      isDefault: 0
    },
    addressStr: ''
  },

  onLoad(query = {}) {
    this.lock = false;
    let { address } = query;
    if (address) {
      address = JSON.parse(address);
      this.id = address.id;
      this.setData({ address });
    }
  },

  onClickDefaultBtn() {
    const isDefault = !this.data.address.isDefault ? 1 : 0;
    this.setData({ 'address.isDefault': isDefault });
  },

  onClickSelectArea() {
    this.setData({ showSelectArea: true });
  },

  onAreaCancel() {
    this.setData({ showSelectArea: false });
  },

  onAreaConfirm(e) {
    const { values } = e.detail;
    const province = values[0].name;
    const city = values[1].name;
    const county = values[2].name;
    const addressName = province + ' ' + city + ' ' + county;
    this.setData({
      showSelectArea: false,
      'address.province': province,
      'address.city': city,
      'address.county': county,
      'address.addressName': addressName
    });
  },

  onNameInput(e) {
    this.setData({ 'address.name': e.detail });
  },

  onPhoneInput(e) {
    this.setData({ 'address.phone': e.detail });
  },

  onAddressInput(e) {
    this.setData({ 'address.address': e.detail });
  },

  onSave() {
    if (this.lock) {
      return;
    }
    const { address } = this.data;
    const keys = Object.keys(address);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'company' && key !== 'isDefault' && !address[key]) {
        return Toast('请完善信息');
      }
    }
    this.lock = true;
    let handle = null;
    if (!this.id) {
      handle = createAddress(address);
    } else {
      handle = updateAddress(this.id, address);
    }
    handle
      .then(() => {
        Toast('保存成功');
        this.navigateBack();
      })
      .catch(() => {
        this.lock = false;
      });
  },

  navigateBack() {
    app.globalData.refreshAddressList = true;
    setTimeout(() => wx.navigateBack(), 1500);
  },

  onShareAppMessage() {
    return {
      title: '爱戴小盒，快来看看吧!',
      path: '/pages/entry/index',
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
