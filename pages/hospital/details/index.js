Page({
  data: {
    hospitals: [
      {
        id: 1,
        name: "瑞鹏宠物医院（中油店）",
        icon: "../resource/hospital/01.jpg",
        rating: 4.5,
        stars: [1, 1, 1, 1, 0.5] // 1=full, 0.5=half
      },
      {
        id: 2,
        name: "祥兽宠物医院（海月店）",
        icon: "../resource/hospital/02.jpg",
        rating: 4.6,
        stars: [1, 1, 1, 1, 0]
      },
      {
        id: 3,
        name: "瑞派宠物医院（福华南山分院）",
        icon: "../resource/hospital/03.png",
        rating: 4.8,
        stars: [1, 1, 1, 1, 0]
      }
    ]
  },

  onLoad: function(options) {
    // 页面加载时逻辑
  },

  // 预约按钮点击事件
  handleAppointment: function(e) {
    const hospitalId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `pages/hospital/appointment/index?id=${hospitalId}`
    });
  }
})