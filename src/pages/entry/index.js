import zx from 'weapp-zx';
// import { getUserRole, changeUserRole } from 'utils/role'
// 获取应用实例

Page({
  data: {
    inited: false,
    logo: 'https://cloud-minapp-30262.cloud.ifanrusercontent.com/logo.png',

  },

  onLoad() {
    let userInfo = wx.BaaS.storage.get('userinfo');
    console.log(userInfo);
    if (userInfo) { // 授权
      this.setData({ inited: true });
      this.changeAndSwitchTab();
    }
  },

  changeAndSwitchTab() {
    wx.switchTab({
      url: '/pages/my/index',
    });
  },

  grant(data) {
    if (data.detail.userInfo) {
      let handleResult = Promise.resolve();
      let userInfo = wx.BaaS.storage.get('userinfo');
      if (!userInfo) { // 授权
        handleResult = zx.handleUserInfo(data);
      }
      handleResult
        .then(user => {
          this.setData({ inited: true });
          console.log(user);
          wx.BaaS.storage.set('userinfo', user);
          this.changeAndSwitchTab();
        });
    } else {
      this.setData({ inited: false });
    }
  }
});
