import { getCartList } from '../../../services/shopping/cart';
import { createOrders } from '../../../services/shopping/order';
Page({
  data: {
    cartList: [
    ],
    totalPrice: 0,
    id: {
      type: String,
      value: '',
      observer: (id) => {
        this.genIndependentID(id);
      },
    },
    thresholds: {
      type: Array,
      value: [],
    },
  },

  onLoad() {
  },
  onShow() {
    this.getCartList();
  },

  calculateTotal() {
    // 处理JavaScript浮点数精度问题
    const total = this.data.cartList.reduce((sum, item) => {
      // 将价格转为整数计算(乘以100)，避免小数计算精度问题
      const price = Math.round(item.product.price * 100);
      const subtotal = price * item.quantity;
      return sum + subtotal;
    }, 0) / 100; // 最后除以100还原小数
    this.setData({ 
      totalPrice: parseFloat(total) // 保留两位小数
    });
  },

  /** 获取购物车列表 */
  getCartList() {
    getCartList().then(res => {
      if(res.success){
        console.log(res);
        this.setData({
          cartList: res.data
        },() => {
          this.calculateTotal();
        });
      }
    })
  },

  increaseQuantity(e) {
    const id = e.currentTarget.dataset.id;
    const cartList = this.data.cartList.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    this.setData({ cartList });
    this.calculateTotal();
  },

  decreaseQuantity(e) {
    const id = e.currentTarget.dataset.id;
    const cartList = this.data.cartList.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setData({ cartList });
    this.calculateTotal();
  },

  deleteItem(e) {
    const id = e.currentTarget.dataset.id;
    const cartList = this.data.cartList.filter(item => item.id !== id);
    this.setData({ cartList });
    this.calculateTotal();
  },

  checkout() {
    const cartList = this.data.cartList.filter(item => item.quantity > 0);
    if(cartList.length === 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/store/toOrder/index?type=cart',
      success(res){
        res.eventChannel.emit('cartInfo', { cartList })
      }
    });
  }
});