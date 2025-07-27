import { getPetList } from '../../services/pet/pet';

const defaultList = [
  {
    id: 1,
    name: '花花',
    image: 'http://117.72.219.186:8080/image/pets/02.jpg',
    desc: '哈威那犬',
    age: 3,
    weight: 5,
    showBtn: false
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petList: [],
    petTypeMap:{
      'cat': '猫',
      'dog': '狗',
      'other': '其他'
    }
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
    this.getPetList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  initPetList(){
    if(defaultList.length>0){
      wx.setStorageSync('petList', defaultList);
    }
  },

  getPetList(){
    const userInfo = wx.getStorageSync('userInfo');
    const { id } = userInfo;
    console.log('id',id,typeof id);
    getPetList(+id).then(res => {
      console.log('petList',res);
      if(res.success){
        const list = res.data;
        if(list.length > 0){
          this.setData({
            petList: list
          })
        }else{
          // this.setData({
          //   petList: defaultList
          // })
        }
      }
    }).catch(err=>{
      console.error(err);
    })
  },
  addPet(){
    // 跳转到添加宠物页面
    wx.navigateTo({
      url: '/pages/pet/editPet/index?type=add',
    })
  },
  deletePet(e) {
    const { index } = e.currentTarget.dataset;
    const { petList } = this.data;
    // 弹出确认对话框
    wx.showModal({
      title: '提示',
      content: '确定要删除该宠物信息吗？',
      success: (res) => {
        if (res.confirm) {
          // 用户点击确定，删除对应宠物
          petList.splice(index, 1);
          this.setData({ petList });
          // 更新本地存储
          wx.setStorageSync('petList', petList);
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        } else if (res.cancel) {
          // 用户点击取消，不做操作
          console.log('用户取消删除');
        }
      }
    });
  },
  editPet(e){
    const { index } = e.currentTarget.dataset;
    const { petList } = this.data;
    const pet = {...petList[index]};
    wx.navigateTo({
      url: '/pages/pet/editPet/index?type=edit&index='+index,
      success: (res) => {
        res.eventChannel.emit('getPetInfo', { pet })
      }
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