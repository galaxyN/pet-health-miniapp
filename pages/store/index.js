import themeChangeBehavior from 'tdesign-miniprogram/mixins/theme-change';

Page({
  behaviors: [themeChangeBehavior],
  data: {
    activeCategory: 'all',
    searchValue: '',
    categories: [
      {id: 'all', name: '全部'},
      {id: 'food', name: '食物'},
      {id: 'toy', name: '玩具'},
      {id: 'petSupplies', name: '宠物用品'},
    ],
    products: [
      {
        id: 1,
        name: '优质狗粮 10kg',
        price: 199,
        sales: 1256,
        image: 'http://117.72.219.186:8080/image/store/food/01.jpg',
        category: 'food'
      },
      {
        id: 2,
        name: '猫咪逗猫棒',
        price: 39,
        sales: 856,
        image: 'http://117.72.219.186:8080/image/store/food/02.jpg',
        category: 'toy'
      },
      {
        id: 3,
        name: '宠物冬季保暖衣',
        price: 89,
        sales: 432,
        image: 'http://117.72.219.186:8080/image/store/food/03.png',
        category: 'petSupplies'
      },
      {
        id: 4,
        name: '宠物窝垫',
        price: 159,
        sales: 289,
        image: 'http://117.72.219.186:8080/image/store/food/04.png',
        category: 'petSupplies'
      },
      {
        id: 5,
        name: '宠物沐浴露',
        price: 59,
        sales: 678,
        image: 'http://117.72.219.186:8080/image/store/food/05.png',
        category: 'petSupplies'
      },
      {
        id: 6,
        name: '宠物零食礼包',
        price: 129,
        sales: 543,
        image: 'http://117.72.219.186:8080/image/store/food/06.png',
        category: 'food'
      },
      {
        id: 7,
        name: '宠物零食礼包',
        price: 129,
        sales: 543,
        image: 'http://117.72.219.186:8080/image/store/food/07.png',
        category: 'food'
      }
    ],
    filteredProducts: []
  },

  onLoad() {
    this.setData({
      filteredProducts: this.data.products
    });
  },
  onShow(){
    this.getTabBar().init();
  },

  goToCart(){
    wx.navigateTo({
      url: '/pages/store/cart/index'
    });
  },
  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    let filteredProducts = this.data.products;
    
    if (category !== 'all') {
      filteredProducts = this.data.products.filter(item => item.category === category);
    }

    this.setData({
      activeCategory: category,
      filteredProducts: filteredProducts
    });
  },

  // 搜索商品
  onSearchInput(e) {
    const value = e.detail.value;
    this.setData({
      searchValue: value
    });
    
    if (value) {
      const filteredProducts = this.data.products.filter(item => 
        item.name.includes(value)
      );
      this.setData({
        filteredProducts: filteredProducts
      });
    } else {
      this.setData({
        filteredProducts: this.data.products
      });
    }
  },

  // 跳转商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/store/goodsDetail/index?id=${id}`
    });
  }
})