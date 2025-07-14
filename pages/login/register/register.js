// pages/login/register/register.js
Page({
  data: {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  onLoad(options) {},
  onInputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },
  onInputEmail(e) {
    this.setData({
      email: e.detail.value
    });
  },
  onInputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },
  onInputConfirmPassword(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },
  onSubmit(e) {
    const { username, email, password, confirmPassword } = this.data;
    
    if (!username) {
      wx.showToast({
        title: "请输入用户名",
        icon: "none"
      });
      return;
    }
    
    if (!email) {
      wx.showToast({
        title: "请输入邮箱",
        icon: "none"
      });
      return;
    }
    
    if (!password) {
      wx.showToast({
        title: "请输入密码",
        icon: "none"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      wx.showToast({
        title: "两次密码输入不一致",
        icon: "none"
      });
      return;
    }
    
    // 这里可以添加注册请求逻辑
    wx.showToast({
      title: "注册成功",
      icon: "success"
    });
    
    // 注册成功后跳转到登录页面
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },
  navigateToLogin() {
    wx.navigateBack();
  }
})