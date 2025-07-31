import { getPetList } from '../../../services/pet/pet'
import { appointments } from '../../../services/organization/appointment'
Page({
  data: {
    id: null,
    type: null,
    orgName: '',
    currentDate: '2025-06-20',
    days: [
      {day: '日', date: ''},
      {day: '一', date: ''},
      {day: '二', date: ''},
      {day: '三', date: ''},
      {day: '四', date: ''},
      {day: '五', date: ''},
      {day: '六', date: ''},
      {day: '1', date: '2025-06-01'},
      {day: '2', date: '2025-06-02'},
      // 其他日期...
      {day: '20', date: '2025-06-20'},
      // 其他日期...
      {day: '30', date: '2025-06-30'}
    ],
    timeSlots: [
      '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30'
    ],
    selectedTime: '',
    currentPet: {
      avatar: '',
      name: '',
      breed: ''
    },
    pets: []
  },

  onLoad: function(options) {
    // 初始化日期数据
    const { id, type } = options;
    let orgName = '';
    // 可根据id和type请求接口获取机构名，这里模拟
    if(type === 'hospital') orgName = '宠物医院';
    if(type === 'beauty') orgName = '美容机构';
    this.setData({ id, type, orgName });
    this.initCalendar();
    this.getPetList();
  },

  initCalendar: function() {
    // 初始化日历数据
    // ...
  },

  // 返回上一页
  navigateBack: function() {
    wx.navigateBack();
  },

  getPetList(){
    const userInfo = wx.getStorageSync('userInfo');
    const { id } = userInfo;
    getPetList(+id).then(res => {
      if(res.success){
        const list = res.data;
        console.log('list',list);
        const pets = list.map(item=>{
          return {
            id: item.id,
            name: item.petName,
            type: item.petType,
            breed: item.breed
          }
        })
        if(pets.length > 0){
          this.setData({
            pets: pets
          })
        }
      }
    }).catch(err=>{
      console.error(err);
    })
  },

  getDate(e){
    console.log(e);
    const date = e.detail;
    this.setData({
      currentDate: date
    })
  },

  // 选择日期
  selectDate: function(e) {
    const date = e.currentTarget.dataset.date;
    if (date) {
      this.setData({ currentDate: date });
    }
  },

  // 选择时间
  selectTime: function(e) {
    const time = e.currentTarget.dataset.time;
    this.setData({ selectedTime: time });
  },

  // 选择宠物
  selectPet: function() {
    wx.showActionSheet({
      itemList: this.data.pets.map(pet => pet.name),
      success: (res) => {
        this.setData({
          currentPet: this.data.pets[res.tapIndex]
        });
      }
    });
  },

  // 确认预约
  confirmAppointment: function() {
    if (!this.data.selectedTime) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({ title: '预约中...' });
    // 预留API调用
    const { id,type,currentPet,currentDate,selectedTime } = this.data
    const params = {
      serviceId: id,
      serviceType: type,
      petId: currentPet.id,
      serviceCategory: '',
      appointmentTime: currentDate+' '+selectedTime,
      notes: ''
    };
    console.log('params',params);
    appointments(params).then(res => {
      console.log(res);
      wx.hideLoading();
      if(res.success){
        setTimeout(() => {
          wx.showToast({ title: '预约成功' });
          setTimeout(() => { wx.navigateBack(); }, 1500);
        }, 1000);
      }
    }).catch(err => {
      wx.hideLoading();
      console.error(err);
    })
  }
})