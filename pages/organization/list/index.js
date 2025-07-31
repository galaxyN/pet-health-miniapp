import { getOrgList } from '../../../services/organization/organization';

Page({
  data: {
    type: null,
    searchVal: '',
    organizations: [
      // {
      //   id: 1,
      //   name: "瑞鹏宠物医院（中油店）",
      //   icon: "../resource/organization/01.jpg",
      //   rating: 4.5,
      //   stars: [1, 1, 1, 1, 0.5],
      //   type: 'hospital'
      // },
    ],
    filteredOrganizations: []
  },

  onLoad: function(options) {
    // 页面加载时逻辑
    const { type } = options;
    let title = '宠物医院';
    if(type==='grooming'){
      title = '美容机构';
    }
    wx.setNavigationBarTitle({ title });
    this.setData({ type });
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
            filteredOrganizations: list,
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
    const { organizations,searchVal } = this.data;
    console.log('searchVal', searchVal);
    let filtered = organizations;
    if(searchVal){
      filtered = organizations.filter(item => item.name.includes(searchVal));
    }
    this.setData({ filteredOrganizations: filtered });
  },

  // 预约按钮点击事件
  handleAppointment: function(e) {
    const index = e.currentTarget.dataset.index;
    const organization = this.data.organizations[index];
    console.log('organization', organization);
    const { type } = this.data;
    wx.navigateTo({
      url: `../details/index?type=${type}`,
      success: (res) => {
        res.eventChannel.emit('detailInfo', { organization })
      }
    });
  },

  toComments(e){
    const { type } = this.data;
    const item = e.currentTarget.dataset.item;
    const { id,rating } = item;
    wx.navigateTo({
      url: `/pages/comments/index?type=${type}&id=${id}&rating=${rating}`
    });
  }
})