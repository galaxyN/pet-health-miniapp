// pages/pet/editPet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderIndex: 0,
    genderOptions: ['公','母'],
    kindIndex: 0,
    kindOptions: [
      { label: '猫', value: 1 },
      { label: '狗', value: 2 },
      { label: '其他', value: 3 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { type } = options
    if(type==='add'){
      wx.setNavigationBarTitle({ title: '添加新宠物' })
    }
    if(type==='edit'){
      wx.setNavigationBarTitle({ title: '编辑宠物信息' })
    }
    this.setData({ type })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  onKindChange: function(e) {
    this.setData({
      kindIndex: e.detail.value
    })
  },
  onGenderChange: function(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
})