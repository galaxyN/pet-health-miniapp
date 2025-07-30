import updateManager from './common/updateManager';
import { getAddressList } from './services/address/address';
App({
  onLaunch: function () {
    this.getAddressList();
  },
  onShow: function () {
    updateManager();
  },

  getAddressList() {
    const userId = wx.getStorageSync('userInfo').id;
    getAddressList(userId).then(res => {
      this.globalData.addressList = res.data;
    });
  },
  globalData: {
    sharedPath: '/images/organization/',
    addressList: [],
    address: {}
  }
});
