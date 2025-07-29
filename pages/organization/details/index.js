Page({
  data: {
    organization: {},
    id: null,
    type: null
  },

  onLoad: function(options) {
    // 页面加载时逻辑
    const { type } = options;
    const that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('detailInfo', function(data) {
      console.log('detailInfo', data);
      const { organization } = data;
      that.setData({ organization, type });
    })
  },

  // 预约按钮点击事件
  handleAppointment: function() {
    const { id, type } = this.data;
    wx.navigateTo({
      url: `../appointment/index?id=${id}&type=${type}`
    })
  }
})