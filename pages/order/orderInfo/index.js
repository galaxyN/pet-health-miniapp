import { formatDateTime } from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    order: {
      id: 1,
      name: '法米娜成犬粮羊肉南瓜7kg通用博美马尔济斯',
      image: 'http://117.72.219.186:8080/image/store/01.jpg',
      status: '待支付',
      price: 100,
      count: 2,

      address: '北京市朝阳区望京街道就是对方觉得是科技科技快乐就是打飞机看时间',
      orderNo: '12345678901',
      time: '2025-07-01',
      time1: '2025-08-01'
    },
    mode: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('getOrderInfo', (data) => {
      console.log('获取订单详情',data);
      // 处理时间格式
      if (data.order.createdAt) {
        const date = new Date(data.order.createdAt);
        data.order.createdAt = formatDateTime(date);
      }
      const address = app.globalData.addressList.find(item => item.id === data.order.addressId);
      if (address) {
        data.order.address = address;
      }
      this.setData({
        order: data.order
      })
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

})