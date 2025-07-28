import { getOrgList } from '../../../services/organization/organization';

Page({
  data: {
    type: null,
    organizations: [
      {
        id: 1,
        name: "瑞鹏宠物医院（中油店）",
        icon: "../resource/organization/01.jpg",
        rating: 4.5,
        stars: [1, 1, 1, 1, 0.5],
        type: 'hospital'
      },
      {
        id: 2,
        name: "祥兽宠物医院（海月店）",
        icon: "../resource/organization/02.jpg",
        rating: 4.6,
        stars: [1, 1, 1, 1, 0],
        type: 'hospital'
      },
      {
        id: 3,
        name: "瑞派宠物医院（福华南山分院）",
        icon: "../resource/organization/03.png",
        rating: 4.8,
        stars: [1, 1, 1, 1, 0],
        type: 'hospital'
      },
      {
        id: 4,
        name: "宠爱美容机构（南山店）",
        icon: "../resource/organization/04.jpg",
        rating: 4.7,
        stars: [1, 1, 1, 1, 0.5],
        type: 'beauty'
      },
      {
        id: 5,
        name: "萌宠造型屋（科技园店）",
        icon: "../resource/organization/05.jpg",
        rating: 4.9,
        stars: [1, 1, 1, 1, 1],
        type: 'beauty'
      }
    ],
    filteredOrganizations: []
  },

  onLoad: function(options) {
    // 页面加载时逻辑
    const { type } = options;
    let title = '宠物医院';
    if(type==='beauty'){
      title = '美容机构';
    }
    wx.setNavigationBarTitle({ title });
    this.setData({ type: type || 'organization' }, this.filterOrganizations);
  },

  onShow(){
    this.getOrgList();
  },

  getOrgList(){
    getOrgList({
      type: this.data.type
    }).then(res => {
      if(res.success){
        console.log('orgList',res);
        const list = res.data;
        if(list.length > 0){
          for(let item of list){
            let score = 0;
            item.stars = []
            while(score <= 5){
              let star = 0;
              if(item.rating-score >= 0){
                if(item.rating-score >= 1){
                  star = 1;
                }else{
                  star = 0.5;
                }
              }
              score++;
              item.stars.push(star);
            }
          }
          this.setData({
            organizations: list
          })
        }else{
          this.setData({
            organizations: []
          })
        }
      }
    })
  },

  filterOrganizations: function() {
    const { organizations, type } = this.data;
    let filtered = organizations;
    if(type === 'hospital' || type === 'beauty'){
      filtered = organizations.filter(item => item.type === type);
    }
    this.setData({ filteredOrganizations: filtered });
  },

  // 预约按钮点击事件
  handleAppointment: function(e) {
    const organizationId = e.currentTarget.dataset.id;
    const { type } = this.data;
    wx.navigateTo({
      url: `../details/index?id=${organizationId}&type=${type}`
    });
  },

  toComments(){
    wx.navigateTo({
      url: '../../comments/index'
    });
  }
})