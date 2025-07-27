// pages/pet/editPet/index.js
import { addPet } from '../../../services/pet/pet.js'
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    avatar: defaultAvatarUrl,
    petName: '',
    breed: '',
    petAge: '',
    petWeight: '',
    type: '',

    genderIndex: 0,
    genderOptions: ['公','母'],
    kindIndex: 0,
    kindOptions: [
      { label: '猫', value: 'cat' },
      { label: '狗', value: 'dog' },
      { label: '其他', value: 'other' },
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
        console.log('res',res);
        const { tempFiles } = res;
        const tempFilePath = tempFiles.length > 0 ? tempFiles[0].tempFilePath : '';
        if(tempFilePath){
          that.setData({
            avatar: tempFilePath
          })
        }
      }
    })
  },

  convertToBase64(filePath) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: filePath,  
        success(result) {
          const imageType = result.type;
          // console.log('图片类型为：', imageType);
          wx.getFileSystemManager().readFile({
            filePath: filePath,
            encoding: 'base64',
            success: (res) => {
              console.log('res',res);
              const base64Data = res.data;
              // console.log('base64Data',base64Data);
              resolve(`data:image/${imageType};base64,${base64Data}`);
            },
            fail: (err) => {
              reject(err);
            }
          })
        },
        fail(err) {
          console.error('获取图片信息失败：', err);
          reject(err);
        }
      });
      
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
  async saveInfo(){
    const userId = wx.getStorageSync('userInfo')?.id;
    const { avatar,petName, breed, petAge, petWeight,genderIndex,kindIndex,kindOptions,type } = this.data;
    const petType = kindOptions[kindIndex].value;
    if(!petName || !petAge || !petWeight){
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    const convertRes = await this.convertToBase64(avatar);
    let avatarBase64 = '';
    if(convertRes.startsWith('data:image')){
      avatarBase64 = convertRes;
    }
    let params = {
      userId,
      petName,
      petType,
      breed: breed,
      gender: genderIndex===0 ? 'male' : 'female',
      weight: +petWeight,
      // age: +petAge,
      avatarBase64: avatarBase64
    };
    if(type === 'add'){
    }
    if(type === 'edit'){
      const id = this.data.id;
      params.id = id;
    }
    console.log('params',params);
    addPet(params).then(res => {
      console.log(res);
      if(res.success){
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    }).catch(err => {

    })
   
  }
})