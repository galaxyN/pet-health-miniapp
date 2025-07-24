const { genSettleDetail } = require('../../../model/order/orderConfirm');

Page({
  data: {
    // 地址信息
    address: null,
    addressList: [],
    
    // 订单信息
    orderItems: [],
    totalAmount: 0,
    freight: 0,
    discountAmount: 0,
    couponAmount: 0,
    finalAmount: 0,
    
    // 其他信息
    paymentMethod: '微信支付',
    remark: '',
    loading: false
  },

  onLoad(options) {
    // 接收购物车传递的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('checkoutData', (data) => {
      this.processCheckoutData(data);
    });
    
    // 如果没有事件通道数据，尝试从本地存储获取
    if (!this.data.orderItems.length) {
      this.loadFromStorage();
    }
    
    // 加载地址列表
    this.loadAddressList();
  },

  onShow() {
    // 重新加载地址（可能从地址选择页面返回）
    this.loadAddressList();
  },

  // 处理购物车数据
  processCheckoutData(data) {
    if (!data || !data.items) return;
    
    const goodsRequestList = data.items.map(item => ({
      spuId: item.id,
      skuId: item.id,
      title: item.title,
      primaryImage: item.image,
      price: item.price,
      quantity: item.quantity,
      specInfo: item.spec || '',
      storeId: '1000',
      roomId: '0'
    }));

    const settleData = genSettleDetail({
      goodsRequestList,
      userAddressReq: this.data.address
    });

    if (settleData.success) {
      const { data } = settleData;
      
      this.setData({
        orderItems: data.storeGoodsList[0]?.skuDetailVos || [],
        totalAmount: Number(data.totalSalePrice) / 100,
        freight: Number(data.totalDeliveryFee) / 100,
        discountAmount: Number(data.totalDiscountAmount) / 100,
        couponAmount: Number(data.totalCouponAmount) / 100,
        finalAmount: Number(data.totalPayAmount) / 100,
        loading: false
      });
      
      // 保存到本地存储，防止页面刷新丢失
      this.saveToStorage();
    }
  },

  // 从本地存储加载
  loadFromStorage() {
    try {
      const orderData = wx.getStorageSync('orderData');
      if (orderData) {
        this.processCheckoutData(orderData);
      }
    } catch (e) {
      console.error('加载订单数据失败', e);
    }
  },

  // 保存到本地存储
  saveToStorage() {
    try {
      const orderData = {
        items: this.data.orderItems,
        address: this.data.address
      };
      wx.setStorageSync('orderData', orderData);
    } catch (e) {
      console.error('保存订单数据失败', e);
    }
  },

  // 加载地址列表
  loadAddressList() {
    // 模拟地址数据，实际应从API获取
    const mockAddressList = [
      {
        id: 1,
        name: '张三',
        phone: '13800138000',
        province: '广东省',
        city: '深圳市',
        district: '南山区',
        detail: '科技园中区一路腾讯大厦',
        isDefault: true
      },
      {
        id: 2,
        name: '李四',
        phone: '13900139000',
        province: '北京市',
        city: '北京市',
        district: '海淀区',
        detail: '中关村大街1号',
        isDefault: false
      }
    ];

    const defaultAddress = mockAddressList.find(item => item.isDefault) || mockAddressList[0];
    
    this.setData({
      addressList: mockAddressList,
      address: this.data.address || defaultAddress
    });

    // 如果有订单数据，重新计算
    if (this.data.orderItems.length) {
      this.recalculateOrder();
    }
  },

  // 选择地址
  selectAddress() {
    wx.navigateTo({
      url: '/pages/address/select',
      events: {
        selectAddress: (address) => {
          this.setData({ address });
          this.recalculateOrder();
        }
      }
    });
  },

  // 重新计算订单
  recalculateOrder() {
    if (!this.data.orderItems.length) return;
    
    const goodsRequestList = this.data.orderItems.map(item => ({
      spuId: item.spuId,
      skuId: item.skuId,
      title: item.goodsName,
      primaryImage: item.image,
      price: Number(item.payPrice),
      quantity: item.quantity,
      specInfo: item.skuSpecLst || '',
      storeId: '1000',
      roomId: '0'
    }));

    const settleData = genSettleDetail({
      goodsRequestList,
      userAddressReq: this.data.address
    });

    if (settleData.success) {
      const { data } = settleData;
      
      this.setData({
        totalAmount: Number(data.totalSalePrice) / 100,
        freight: Number(data.totalDeliveryFee) / 100,
        discountAmount: Number(data.totalDiscountAmount) / 100,
        couponAmount: Number(data.totalCouponAmount) / 100,
        finalAmount: Number(data.totalPayAmount) / 100
      });
    }
  },

  // 输入备注
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  // 提交订单
  async submitOrder() {
    if (!this.data.address) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return;
    }

    if (!this.data.orderItems.length) {
      wx.showToast({
        title: '订单商品为空',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    try {
      // 构建订单数据
      const orderData = {
        address: this.data.address,
        items: this.data.orderItems,
        totalAmount: this.data.totalAmount,
        freight: this.data.freight,
        discountAmount: this.data.discountAmount,
        couponAmount: this.data.couponAmount,
        finalAmount: this.data.finalAmount,
        paymentMethod: this.data.paymentMethod,
        remark: this.data.remark,
        createTime: new Date().toISOString()
      };

      // 模拟API提交
      await this.submitOrderToServer(orderData);
      
      // 清除本地存储
      wx.removeStorageSync('orderData');
      
      // 跳转到订单成功页面
      wx.redirectTo({
        url: `/pages/order/success?orderId=${this.generateOrderId()}`
      });
      
    } catch (error) {
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  // 模拟提交订单到服务器
  submitOrderToServer(orderData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('订单提交成功:', orderData);
        resolve();
      }, 1500);
    });
  },

  // 生成订单号
  generateOrderId() {
    return 'ORDER' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  },

  // 返回购物车
  backToCart() {
    wx.navigateBack();
  }
});