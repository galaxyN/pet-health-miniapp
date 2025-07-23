
Page({
  data: {
    user: {
      nickname: '',
      phone: '',
      address: '',
      avatarUrl: ''
    }
  },

  onLoad() {
  },
  
  onShow() {
    this.getTabBar().init();
    this.getUserInfo();
  },

  getUserInfo() {
    console.log('getUserInfo')
    const userInfo = wx.getStorageSync('userInfo'); // 假设从本地存储中获取用户ID
    console.log('userInfo', userInfo);
    if(!userInfo) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    }else{
      const { user } = this.data;
      user.nickname = userInfo.nickname;
      user.avatarUrl = userInfo.avatarUrl;
      this.setData({ user });
    }
  }

});
