import { fetchLogin,accountProfile } from '../../services/usercenter/auth';
import { setToken } from '../../utils/util';
Page({
  data: {
    username: "admin",
    password: "a123456",
  },
  onLoad(options) {},
  
  onSubmit(e) {
    const { username, password } = this.data;
    if (!username) {
      wx.showToast({
        title: "请输入用户名",
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
    // 这里可以添加登录请求逻辑
    const params = {
      username,
      password,
      lang: 'zh-CN'
    }
    console.log(params);
    fetchLogin(params).then((resData) => {
      console.log('fetchLogin', resData);
      if (resData.success) {
        const { token } = resData.data;
        console.log('token', token);
        setToken(token);
        accountProfile().then((profileData) => {
          console.log('accountProfile', profileData);
          wx.showToast({
            title: "登录成功",
            icon: "success"
          })
          wx.switchTab({
            url: "../home/home"
          })
        }).catch(err => {
          console.error(err);
        })
      }else if (resData.code == 400) {
        wx.showToast({
          title: "用户名或密码错误",
          icon: "none"
        })
      }
    }).catch(err=>{
      console.error(err);
    })
  },
  onForgotPassword() {
    wx.showToast({
      title: "忘记密码功能待实现",
      icon: "none"
    });
  },
  onRegister() {
    console.log('register');
    wx.navigateTo({
      url: "./register/register"
    });
  }
})