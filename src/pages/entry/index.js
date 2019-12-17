import zx from 'weapp-zx';
// import { getUserRole, changeUserRole } from 'utils/role'
// 获取应用实例

Page({
  data: {
    inited: false,
    logo: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',

  },

  onLoad() {
    // let userInfo = wx.BaaS.storage.get('userinfo');
    // if (!userInfo) { // 授权
    //   this.setData({ inited: true });
    //   this.changeAndSwitchTab();
    // }
  },

  changeAndSwitchTab() {
    wx.switchTab({
      url: '/pages/my/index',
    });
  },

  grant(data) {
    console.log(data);
    if (data.detail.userInfo) {
      let handleResult = Promise.resolve();
      let userInfo = wx.BaaS.storage.get('userinfo');
      if (!userInfo) { // 授权
        handleResult = zx.handleUserInfo(data);
      }
      handleResult
        .then(() => zx.get('user', 'me'))
        .then(res => {
          this.setData({ inited: true });
          wx.BaaS.storage.set('userinfo', res.data);
          this.changeAndSwitchTab();
        });
    } else {
      this.setData({ inited: false });
    }
  }
});
