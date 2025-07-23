Page({
  data: {
    address: {
      name: 'coni',
      phone: '12345678910',
      detail: '北京市海淀区123街道123小区'
    },
    goodsList: [
      {
        name: '法米娜成犬粮羊肉南瓜7kg通用博美马尔济斯',
        price: 95.00
      },
      {
        name: 'wurendao无人岛猫窝四半封闭式藤编猫窝狗窝',
        price: 374.00
      }
    ],
    freight: 10.00,
    paymentMethod: '微信支付'
  },

  // 计算总价
  getTotalPrice() {
    return this.data.goodsList.reduce((total, item) => total + item.price, 0) + this.data.freight;
  },

  // 编辑地址
  editAddress() {
    wx.navigateTo({
      url: '/pages/address/edit'
    });
  },

  // 提交订单
  submitOrder() {
    wx.showLoading({
      title: '提交中...',
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '订单提交成功',
        icon: 'success'
      });
    }, 1500);
  },

  onLoad() {
    this.setData({
      totalPrice: this.getTotalPrice().toFixed(2)
    });
  }
});