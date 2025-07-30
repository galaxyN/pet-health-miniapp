
import { accountProfile } from '../../services/usercenter/auth';
import { updateUserInfo } from '../../services/usercenter/user';
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
      user.phone = userInfo.phone;
      user.address = userInfo.address;
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

  onNicknameInput(e) {
    this.setData({
      'user.nickname': e.detail.value
    });
  },

  onPhoneInput(e) {
    this.setData({
      'user.phone': e.detail.value
    });
  },

  onAddressInput(e) {
    this.setData({
      'user.address': e.detail.value
    });
  },

  async saveUserInfo() {
    const { user } = this.data;
    
    // 简单的表单验证
    if (!user.nickname.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    
    if (!user.phone.trim()) {
      wx.showToast({
        title: '请输入电话号码',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '保存中...',
    });

    try {
      // 调用保存用户信息的接口
      const result = await this.updateUserInfo(user);
      wx.hideLoading();
      
      if (result.success) {
        // 保存成功后更新本地存储
        const userInfo = wx.getStorageSync('userInfo') || {};
        Object.assign(userInfo, user);
        wx.setStorageSync('userInfo', userInfo);
        
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: result.message || '保存失败',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      });
    }
  },

  goToAddress() {
    wx.navigateTo({
      url: './address/list/index',
    });
  },

  // 更新用户信息接口
  updateUserInfo(userData) {
    return updateUserInfo(userData);
  },

});
