import themeChangeBehavior from 'tdesign-miniprogram/mixins/theme-change';
import { getCategories,getProductList } from '../../services/shopping/product'
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
      // {
      //   id: 1,
      //   name: '优质狗粮 10kg',
      //   price: 199,
      //   sales: 1256,
      //   image: 'http://117.72.219.186:8080/image/store/food/01.jpg',
      //   category: 'food'
      // }
    ],
    filteredProducts: []
  },

  onLoad() {
    this.setData({
      filteredProducts: this.data.products
    });
  },
  async onShow(){
    this.getTabBar().init();
    await this.getCategory();
    await this.getProductList();
  },

  getCategory(){
    getCategories().then(res=>{
      console.log('getCategories',res);
      if(res.success){
        console.log('res data',res.data);
      }
    })
  },

  getProductList(){
    getProductList().then(res => {
      console.log('getProductList',res);
      if(res.success){
        const { items } = res.data;
        this.setData({ 
          products : items,
          filteredProducts: items 
        })
      }
    })
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