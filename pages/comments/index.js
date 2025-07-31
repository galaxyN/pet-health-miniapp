// pages/comments/index.js
import { getCommentList } from '../../services/comments/comments';
Page({
  data: {
    commentList: [
      // {
      //   id: '1',
      //   userName: 'George',
      //   commentTime: '2025年9月3日',
      //   commentScore: 5,
      //   commentContent: '刚开始从小红书看到就过来看看，狗狗护理多而且都很有特色，不知道是不是店品里自带的狗狗，都很乖。好像很干净主要是灯光好所以看着有特点，洗护类容还不错试过，但是有点小贵。'
      // },
    ],
    scoreList: [
      { score: 5,count: 124},
      { score: 4,count: 87},
      { score: 4,count: 87},
      { score: 4,count: 87},
      { score: 4,count: 87}
    ],
    rating: 0,
    total: 0,
    activeTab: '最新',
    id: null,
    type: ''
  },

  onLoad(options) {
    // 页面加载时的初始化逻辑
    console.log('options',options);
    const { type, id,rating } = options;
    this.setData({ type, id: Number(id),rating: Number(rating) });
  },
  onShow(){
    this.getCommentList();
  },
  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  getCommentList(){
    getCommentList({
      organizationId: this.data.id,
      organizationType: this.data.type
    }).then(res => {
      if(res.success){
        console.log('commentList',res);
        const list = res.data.items;
        this.setData({
          commentList: list
        })
      }
    })
  },

  // 写评论
  writeComment() {
    const { id,type } = this.data;
    wx.navigateTo({
      url: `./addComment/index?id=${id}&type=${type}`
    })
  }
});