// pages/comments/addComment/index.js
import { addComment } from '../../../services/comments/comments';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    type: '',
    rating: 2,
    commentContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id,
      type: options.type
    })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  onRateChange(e){
    this.setData({
      rating: e.detail.value
    })
  },

  onSubmit(){
    const { rating, commentContent } = this.data;
    if(rating === 0){
      wx.showToast({
        title: '请选择评分',
        icon: 'none'
      })
      return;
    }
    if(commentContent.length === 0){
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return;
    }
    if(commentContent.length > 200){
      wx.showToast({
        title: '评论内容不能超过200个字符',
        icon: 'none'
      })
      return;
    }
    addComment({
      organizationId: this.data.id,
      organizationType: this.data.type,
      rating,
      content: commentContent
    }).then(res => {
      if(res.success){
        wx.showToast({
          title: '评论成功',
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    }).catch(err => {
      console.error('err',err);
      wx.showModal({
        title: '提示',
        content: err.message,
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#576B95',
      })
    })
  }
})