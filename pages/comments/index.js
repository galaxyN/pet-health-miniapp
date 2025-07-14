// pages/comments/index.js
Page({
  data: {
    commentList: [
      {
        id: '1',
        userName: 'George',
        commentTime: '2025年9月3日',
        commentScore: 5,
        commentContent: '刚开始从小红书看到就过来看看，狗狗护理多而且都很有特色，不知道是不是店品里自带的狗狗，都很乖。好像很干净主要是灯光好所以看着有特点，洗护类容还不错试过，但是有点小贵。'
      },
      {
        id: '2',
        userName: 'Peggy',
        commentTime: '2025年8月20日',
        commentScore: 5,
        commentContent: '公司旁边新开的店，下班就能来宠物回诊，而且交通很方便！！你的宠物太可爱啦'
      }
    ],
    scoreList: [
      {
        score: 5,
        count: 124
      },
      {
        score: 4,
        count: 87
      },
      {
        score: 3,
        count: 56
      },
      {
        score: 2,
        count: 34
      },
      {
        score: 1,
        count: 12
      }
    ],
    total: 313,
    activeTab: '最新'
  },

  onLoad() {
    // 页面加载时的初始化逻辑
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

  // 写评论
  writeComment() {
    wx.navigateTo({
      url: './addComment/index'
    })
  }
});