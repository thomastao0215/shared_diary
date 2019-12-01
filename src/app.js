import zx from 'weapp-zx';

const clientID = '99fe8993f749105e6a6b';
zx.init(clientID);

App({
  onLaunch() {
    zx.login()
      .then(res => {
        console.log('user:login', res);
        this.globalData.userId = res.id;
      });
  },
  globalData: {
    userId: null,
    userInfo: null,

  }

});
