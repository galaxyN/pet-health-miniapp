Page({
  data: {
    petInfo: {
      name: 'Coni',
      type: '马尔济斯',
      age: '4岁6个月',
      avatar: '/images/cat-1.jpeg'
    }
  },

  onLoad: function() {
    // 页面加载时初始化数据
  },

  addPet: function() {
    // 添加宠物逻辑
    wx.navigateTo({
      url: '/pages/add-pet/add-pet'
    });
  },

  goToHospital: function() {
    // 跳转医院预约
    wx.navigateTo({
      url: '/pages/hospital/list/index?type=hospital'
    });
  },

  goToBeauty: function() {
    // 跳转美容预约
    wx.navigateTo({
      url: '/pages/hospital/list/index?type=beauty'
    });
  },

  switchTab: function(e) {
    // 切换底部导航
    const index = e.currentTarget.dataset.index;
    const urls = [
      '/pages/index/index',
      '/pages/schedule/schedule',
      '/pages/pets/pets',
      '/pages/records/records',
      '/pages/profile/profile'
    ];
    wx.switchTab({
      url: urls[index]
    });
  }
})