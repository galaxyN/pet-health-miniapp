// pages/pet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petList: [
      {
        id: 1,
        name: '花花',
        image: 'http://117.72.219.186:8080/image/pets/02.jpg',
        desc: '哈威那犬',
        age: 3,
        weight: 5,
        showBtn: false
      },
      {
        id: 2,
        name: '旺财',
        image: 'http://117.72.219.186:8080/image/pets/03.jpg',
        desc: '马尔济斯',
        age: 5,
        weight: 3,
        showBtn: false
      },
      {
        id: 3,
        name: '小白',
        image: 'http://117.72.219.186:8080/image/pets/04.jpg',
        desc: '暹罗猫',
        age: 2,
        weight: 4.8,
        showBtn: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  addPet(){
    // 跳转到添加宠物页面
    wx.navigateTo({
      url: '/pages/pet/editPet/index?type=add',
    })
  },

  editPet(){
    wx.navigateTo({
      url: '/pages/pet/editPet/index?type=edit',
    })
  },

  showMore(e){
    let index = e.currentTarget.dataset.index;
    const { petList } = this.data;
    petList[index].showBtn = !petList[index].showBtn;
    this.setData({
      petList: petList
    })
  }
})