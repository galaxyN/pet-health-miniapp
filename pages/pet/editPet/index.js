// pages/pet/editPet/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    avatar: defaultAvatarUrl,
    petName: '',
    petKind: '',
    petAge: '',
    petWeight: '',
    type: '',

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
      const that = this;
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('getPetInfo', function(data) {
        const { pet } = data;
        that.setData({
          id: pet.id,
          avatar: pet.image || defaultAvatarUrl,
          petName: pet.name,
          petKind: pet.desc,
          petAge: pet.age,
          petWeight: pet.weight,
          genderIndex: pet.gender === '公' ? 0 : 1,
          kindIndex: pet.kind === '猫' ? 0 : (pet.kind === '狗' ? 1 : 2)
        })
      })
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

  chooseAvatar(){
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        const { tempFiles } = res;
        const tempFilePath = tempFiles.length > 0 ? tempFiles[0].tempFilePath : '';
        console.log('tempFilePath',tempFilePath)
        if(tempFilePath){
          that.setData({
            avatar: tempFilePath
          })
        }
      }
    })
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
  showPetInfo(){
    const { avatar,petName, petKind, petAge, petWeight } = this.data;
    wx.showModal({
      title: '宠物信息',
      content: `头像：${avatar}\n姓名：${petName}\n种类：${petKind}\n年龄：${petAge}岁\n体重：${petWeight}kg`,
      confirmText:'知道了'
    })
  },
  // 保存宠物信息
  saveInfo(){
    const { avatar,petName, petKind, petAge, petWeight,genderIndex,kindIndex,kindOptions,type } = this.data;
    const kind = kindOptions[kindIndex].value;
    if(!petName || !petKind || !petAge || !petWeight){
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return;
    }
    let params = {
      name: petName,
      image: avatar,
      desc: petKind,
      age: +petAge,
      weight: +petWeight,
      gender: genderIndex,
      kind
    };
    const petList = wx.getStorageSync('petList') || [];
    if(type === 'add'){
      params.id = petList[petList.length-1].id+1 || 1;
      petList.push(params);
    }
    if(type === 'edit'){
      const id = this.data.id;
      params.id = id;
      petList.forEach(item => {
        if(item.id === id){
          Object.assign(item, params)
        }
      })
    }
    console.log('params',params);
    wx.showToast({
      title: '保存成功',
    })
    wx.setStorageSync('petList', petList);
    wx.navigateBack({
      delta: 1,
    })
  }
})