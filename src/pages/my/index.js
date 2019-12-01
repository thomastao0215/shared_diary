import Toast from 'vant-weapp/dist/toast/toast';
import zx from 'weapp-zx';

Page({
  data: {
    userInfo: {
      nickName: '点击头像登陆'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    default_avatarUrl: 'https://cloud-minapp-25663.cloud.ifanrusercontent.com/1hEl1dExlftTcM6M.jpg',
    joinDate: 0
  },

  // 事件处理函数
  switchToBox() {
    wx.switchTab({
      url: '../box/index'
    });
  },
  Subs() {
    wx.setClipboardData({
      data: 'public_account',
      success() {
        wx.getClipboardData({
          success() {
            wx.hideToast({
              complete() {
                Toast('公众号已复制，前往微信顶部搜索框粘贴搜索');
              }
            });
          }
        });
      }
    });
  },
  onLoad() {
    // 获取 user 信息
    let userInfo = wx.BaaS.storage.get('userinfo');
    zx.get('user', 'me').then(res => {
      console.log(res);
    });
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      });
    }
  },

  navToWallet() {
    wx.navigateTo({
      url: '/packages/wallet/index'
    });
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg);
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
  },

  navToBox() {
    wx.switchTab({
      url: '/pages/box/index'
    });
  },

  navToInvite() {
    wx.navigateTo({
      url: '/packages/invite/index'
    });
  },

  navToAddress() {
    wx.navigateTo({
      url: '/packages/address/list/index'
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
