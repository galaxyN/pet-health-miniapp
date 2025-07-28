import { getPetList } from '../../services/pet/pet';
Page({
  data: {
    petInfo: {
      name: 'Coni',
      desc: '马尔济斯',
      age: '4岁6个月',
      image: ''
    }
  },

  onLoad: function() {
    // 页面加载时初始化数据
  },

  onShow(){
    this.getTabBar().init();
    this.getPetInfo();
  },

  /**
   * 获取宠物信息
   */
  getPetInfo: function() {
    const userInfo = wx.getStorageSync('userInfo');
    const { id } = userInfo;
    let firstPet; 
    getPetList(+id).then(res => {
      console.log('petList',res);
      if(res.success){
        const list = res.data;
        if(list.length > 0){
          // 获取第一条宠物信息
          firstPet = list[0]
          this.setData({
            petInfo: firstPet
          });
        }
      }
    }).catch(err=>{
      console.error(err);
    })
  },
  
  
  toPet(){
    wx.switchTab({
      url: '/pages/pet/index'
    });
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