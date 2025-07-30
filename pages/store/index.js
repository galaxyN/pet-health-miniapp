import themeChangeBehavior from 'tdesign-miniprogram/mixins/theme-change';
import { getCategories,getProductList } from '../../services/shopping/product'
import { baseUrl } from '../../utils/baseConfig'

Page({
  behaviors: [themeChangeBehavior],
  data: {
    activeCategory: 0,
    searchValue: '',
    categories: [
      // {id: 'all', name: '全部'},
      // {id: 'food', name: '食物'},
      // {id: 'toy', name: '玩具'},
      // {id: 'petSupplies', name: '宠物用品'},
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
        const list = res.data.items;
        const categories = list.map(item => ({
          id: item.categoryId,
          parentId: item.parentId,
          name: item.name
        }));
        const temp = []
        categories.sort((a,b)=>{
          return a.parentId - b.parentId
        })
        categories.forEach(item => {
          if(!item.parentId){
            item.children = []
            temp.push(item)
          }else{
            const index = temp.findIndex(t=>t.id === item.parentId)
            if(index > -1){
              temp[index].children.push(item)
            }
          }
        })
        console.log('temp',temp);
        temp.unshift({id: 0, name: '全部'});
        this.setData({
          categories: temp
        })
      }
    })
  },

  getProductList(){
    getProductList().then(res => {
      console.log('getProductList',res);
      if(res.success){
        const { items } = res.data;
        items.forEach(item => {
          item.mainImage = baseUrl + item.mainImage
        })
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
    const categoryId = e.currentTarget.dataset.id;
    let filteredProducts = this.data.products;
    if (categoryId !== 0) {
      filteredProducts = this.data.products.filter(item => item.categoryId === categoryId);
    } else {
      filteredProducts = this.data.products;
    }

    this.setData({
      activeCategory: categoryId,
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
    console.log('id',id);
    wx.navigateTo({
      url: `/pages/store/goodsDetail/index?id=${id}`
    });
  }
})