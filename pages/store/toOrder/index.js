const { genSettleDetail } = require('../../../model/order/orderConfirm');
import { createOrders } from '../../../services/shopping/order';
import { getAddressList } from '../../../services/usercenter/address';

Page({
  data: {
    // 地址信息
    address: null,
    addressList: [],
    type: '',

    // 订单信息
    orderItems: [],
    totalAmount: 0,
    freight: 12,
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
    const that = this;
    eventChannel.on('orderInfo', ({ orderInfo }) => {
      console.log('orderInfo',orderInfo);
      that.processOrderData(orderInfo);
    });
    if(options.type === 'cart'){
      this.setData({ type: 'cart' })
    }
    eventChannel.on('cartInfo', ({ cartList }) => {
      console.log('cartList',cartList);
      that.processCheckoutData(cartList);
    })
  },

  onShow() {
    // 重新加载地址（可能从地址选择页面返回）
    this.loadAddressList();
  },

  // 处理立即下单数据
  processOrderData(data){
    if (!data) return;
    const orderItems = [{
      productId: data.productId,
      quantity:  data.quantity,
      name: data.name,
      price: data.price
    }]
    let finalAmount = 0;
    orderItems.forEach(item => {
      const totalPrice = item.quantity * item.price
      finalAmount += totalPrice
    })
    finalAmount += this.data.freight - this.data.discountAmount - this.data.couponAmount
    this.setData({ orderItems, finalAmount })
  },

  // 处理购物车数据
  processCheckoutData(cartList) {
    if (!cartList || cartList.length === 0) return;
    const orderItems = cartList.map(item => ({
      id: item.id,
      quantity:  item.quantity,
      name: item.product.name,
      price: item.product.price,
    }));
    let finalAmount = 0;
    orderItems.forEach(item => {
      const totalPrice = item.quantity * item.price
      finalAmount += totalPrice
    })
    finalAmount += this.data.freight - this.data.discountAmount - this.data.couponAmount
    this.setData({ orderItems, finalAmount })
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
    const userId = wx.getStorageSync('userInfo').id;
    getAddressList(userId).then(res => {
      if (res.success) {
        console.log('加载地址列表',res.data);
        this.setData({
          addressList: res.data,
          address: this.data.address || res.data[0]
        });
      }
    })
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
      let orderPayload = {};
      if(this.data.type === 'cart'){
        const cartItems = this.data.orderItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        }));
        orderPayload = {
          cartItems,
          addressId: this.data.address.addressId,
          remark: this.data.remark,
        };
      }else{
        orderPayload = {
          productId: this.data.orderItems[0].productId,
          addressId: this.data.address.addressId,
          quantity: this.data.orderItems[0].quantity,
          remark: this.data.remark,
        };
      }

      // 调用下单接口
      const res = await createOrders(orderPayload);
      console.log('下单接口',res);
      if (res && res.success) {
        // 清除本地存储
        wx.removeStorageSync('orderData');
        wx.showToast({
          title: '下单成功',
          icon: 'success'
        });
        const t = setTimeout(() => {
          // 跳转到订单成功页面，带上后端返回的订单号
          wx.switchTab({
            url: `/pages/order/index?orderId=${res.data.id || ''}`
          });
          clearTimeout(t);
        }, 1500);
      } else {
        wx.showToast({
          title: res && res.message ? res.message : '提交失败，请重试',
          icon: 'none'
        });
      }
    } catch (error) {
      wx.showToast({
        title: error && error.message ? error.message : '提交失败，请重试',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
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