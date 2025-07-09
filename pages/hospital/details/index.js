Page({
  data: {
    hospital: {
      name: '瑞鹏宠物医院（中油店）',
      image: '../resource/hospital/01.jpg',
      rating: 4.5,
      address: "南山区南山街道南山大道东创业路北南海城中心7栋101A",
      phone: "1234567890",
      comments: [
        {
          username: "George",
          date: "2025年6月3日",
          content: "我家狗狗10岁了，家里住在瑞鹏花园城附近。医生给的建议非常详细，蒋医生经验丰富，还提醒我下次注射疫苗的时间..."
        },
        {
          username: "Peggy",
          date: "2025年5月29日",
          content: "带我家汤圆来瑞鹏花园城绝育，今天已经是第十二天了，汤圆恢复的挺好的。今天过来复诊，刘医生说已经没有什么问题了，现在活泼开朗，绝育对它一定影响也没有。"
        }
      ]
    }
  },

  onLoad: function(options) {
    // 页面加载时逻辑
  },

  // 返回上一页
  navigateBack: function() {
    wx.navigateBack()
  },

  // 预约按钮点击事件
  handleAppointment: function() {
    wx.navigateTo({
      url: '../appointment/index'
    })
  }
})