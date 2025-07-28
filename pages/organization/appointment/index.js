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
      avatar: '/images/pet-avatar.jpg',
      name: 'Coni',
      breed: '马尔济斯'
    },
    pets: [
      {
        avatar: '/images/pet-avatar.jpg',
        name: 'Coni',
        breed: '马尔济斯'
      },
      // 其他宠物...
    ]
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
  },

  initCalendar: function() {
    // 初始化日历数据
    // ...
  },

  // 返回上一页
  navigateBack: function() {
    wx.navigateBack();
  },

  // 选择日期
  selectDate: function(e) {
    const date = e.currentTarget.dataset.date;
    if (date) {
      this.setData({
        currentDate: date
      });
    }
  },

  // 选择时间
  selectTime: function(e) {
    const time = e.currentTarget.dataset.time;
    this.setData({
      selectedTime: time
    });
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
    const params = {
      orgId: this.data.id,
      orgType: this.data.type,
      pet: this.data.currentPet,
      date: this.data.currentDate,
      time: this.data.selectedTime
    };
    // TODO: 调用后端API提交预约 params
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '预约成功' });
      setTimeout(() => { wx.navigateBack(); }, 1500);
    }, 1000);
  }
})