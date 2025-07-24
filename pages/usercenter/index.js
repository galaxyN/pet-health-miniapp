
Page({
  data: {
    user: {
      nickname: '',
      phone: '',
      address: '',
      avatarUrl: ''
    },
    showLogin: false,
    confirmBtn: { content: '确定', variant: 'base' },
  },

  onLoad() {
  },
  
  onShow() {
    this.getTabBar().init();
    this.getUserInfo();
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo'); // 假设从本地存储中获取用户ID
    console.log('userInfo', userInfo);
    if(!userInfo) {
      this.setData({ showLogin: true });
    }else{
      const { user } = this.data;
      user.nickname = userInfo.nickname;
      user.avatarUrl = userInfo.avatarUrl;
      this.setData({ user });
    }
  },

  showUser(){
    const userInfo = wx.getStorageSync('userInfo'); 
    if(userInfo){
      const { user } = this.data;
      user.nickname = userInfo.nickname;
      user.avatarUrl = userInfo.avatarUrl;
      this.setData({ user });
    }else{
      this.setData({ showLogin: true });
    }
  },

  showDialog(e) {
    const { key } = e.currentTarget.dataset;
    this.setData({ [key]: true, dialogKey: key });
  },

  confirmAction(){
    wx.navigateTo({
      url: '/pages/login/index',
    });
    this.closeDialog();
  },

  closeDialog() {
    this.setData({ showLogin: false });
  },

});
