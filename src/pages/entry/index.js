import zx from 'weapp-zx';
// import { getUserRole, changeUserRole } from 'utils/role'
// 获取应用实例

Page({
  data: {
    inited: false,
    logo: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',

  },

  onLoad() {
    this.setData({ inited: true });
    let userInfo = wx.BaaS.storage.get('userinfo');
    if (userInfo) { // 授权
      this.changeAndSwitchTab();
    }
  },

  changeAndSwitchTab() {
    wx.switchTab({
      url: '/pages/my/index',
    });
  },

  handleClickSeeker() {
    zx.get('user', 'me').then(res => {
      console.log(res);
      this.changeAndSwitchTab(2);
    });
  },
  grant(data) {
    let handleResult = Promise.resolve();
    let userInfo = wx.BaaS.storage.get('userinfo');
    if (!userInfo) { // 授权
      handleResult = zx.handleUserInfo(data);
    }
    handleResult
      .then(() => zx.get('user', 'me'))
      .then(res => {
        wx.BaaS.storage.set('userinfo', res.data);
        this.changeAndSwitchTab();
      });
  },

  handleSelectRecruiter() {
    zx.get('user', 'me').then(res => {
      if (!res.data.recruiter) {
        wx.navigateTo({ url: '/pages/login/index' });
      } else {
        this.changeAndSwitchTab(1);
      }
    });
  }
});
