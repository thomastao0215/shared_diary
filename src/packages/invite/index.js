import { getImageUrl } from 'utils/image';
import { api, request } from 'utils/api';
import util from 'utils/util';

Page({
  onLoad() {
    request(
      api.info
    ).then(res => {
      const user = res.user;
      this.user = user;
      const ticketImage = getImageUrl('slice/invite/ticket.png');
      this.setData({
        ticketImage,
        c1: user.invited_subscribed_count,
        c2: user.invited_not_subscribed_count
      });
    });
  },

  onShareAppMessage() {
    return {
      title: '小分香，分享每一份香!',
      path: '/pages/entry/index?from_uid=' + this.user.id + '&from_uid_time=' + util.formatTime(new Date()),
      imageUrl: 'http://static.wx.qiaqiabox.com/slice/share/1.jpeg'
    };
  }
});
