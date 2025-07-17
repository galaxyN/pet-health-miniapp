
Page({
  data: {
    user: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区'
    }
  },

  onLoad() {

  },

  onShow() {
    this.getTabBar().init();
  },


});
