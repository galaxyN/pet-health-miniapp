Page({
  data: {
    cartList: [
      {
        id: 1,
        image: 'http://117.72.219.186:8080/image/store/food/05.png',
        title: '法米娜成犬粮羊肉南瓜7kg通用博美马尔济斯',
        price: 95,
        quantity: 1
      },
      {
        id: 2,
        image: 'http://117.72.219.186:8080/image/store/food/06.png',
        title: 'wurendao无人岛猫窝四半封闭式藤编猫窝狗窝',
        price: 374,
        quantity: 1
      }
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
    this.calculateTotal();
  },

  calculateTotal() {
    const total = this.data.cartList.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    this.setData({ totalPrice: total });
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
    wx.showToast({
      title: '结算成功',
      icon: 'success'
    });
  }
});