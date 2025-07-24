Page({
  data: {
    detailContent: `
      <div style="color:#333;font-size:14px;">
        <p><strong>产品特点：</strong></p>
        <p>1. 全犬种通用配方，满足不同体型犬只营养需求</p>
        <p>2. 添加益生菌，促进肠道健康</p>
        <p>3. 高蛋白低脂肪配方，保持理想体态</p>
        <p>4. 无人工防腐剂、色素和香料</p>
        
        <p><strong>成分：</strong></p>
        <p>鸡肉粉、玉米粉、小麦粉、鱼粉、动物脂肪、甜菜粕、酵母提取物、维生素和矿物质等</p>
        
        <p><strong>食用建议：</strong></p>
        <p>每日喂食量根据犬只体重而定：</p>
        <p>5kg以下：50-80g/天</p>
        <p>5-10kg：80-120g/天</p>
        <p>10-20kg：120-200g/天</p>
        <p>20kg以上：200-300g/天</p>
        
        <img src="http://117.72.219.186:8080/image/store/food/01.jpg" style="width:100%;margin:10px 0;">
        <img src="http://117.72.219.186:8080/image/store/food/02.jpg" style="width:100%;margin:10px 0;">
      </div>
    `,
    specs: [
      {
        name: '规格',
        options: ['10kg', '5kg', '1kg试用装'],
        selected: 0
      },
      {
        name: '口味',
        options: ['牛肉味', '鸡肉味', '三文鱼味'],
        selected: 0
      }
    ],
    quantity: 1,
    isFavorite: false,
    comment: {
      userName: '张三',
      content: '这款狗粮真的很不错，狗狗很喜欢吃。',
      score: 5,
      time: '2023-10-01'
    }
  },

  onLoad(options) {
    // 模拟从服务器加载商品数据
    this.setData({
      goodsId: options.id || '1'
    });
    
    // 初始化购物车角标
    this.updateCartBadge();
  },

  // 选择规格
  selectSpec(e) {
    const { specIndex, optionIndex } = e.currentTarget.dataset;
    const specs = this.data.specs;
    specs[specIndex].selected = optionIndex;
    this.setData({ specs });
  },

  // 修改数量
  changeQuantity(e) {
    const type = e.currentTarget.dataset.type;
    let quantity = this.data.quantity;
    
    if (type === 'add') {
      quantity = Math.min(quantity + 1, 99);
    } else {
      quantity = Math.max(quantity - 1, 1);
    }
    
    this.setData({ quantity });
  },

  // 收藏/取消收藏
  toggleFavorite() {
    this.setData({
      isFavorite: !this.data.isFavorite
    });
    
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'none'
    });
  },

  // 加入购物车
  async addToCart() {
    const { goodsId, specs, quantity, detailContent } = this.data;
    const goodsInfo = {
      id: goodsId,
      title: '优质狗粮 10kg 全犬种通用 营养均衡配方',
      price: 19900, // 单位：分
      image: 'http://117.72.219.186:8080/image/store/food/01.jpg',
      quantity: quantity,
      spec: specs.map(spec => spec.options[spec.selected]).join(' '),
      selected: true
    };

    try {
      const cart = wx.getStorageSync('cart') || [];
      const existingIndex = cart.findIndex(item => item.id === goodsId && item.spec === goodsInfo.spec);
      
      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push(goodsInfo);
      }
      
      wx.setStorageSync('cart', cart);
      
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      });
      
      // 更新购物车数量显示
      this.updateCartBadge();
    } catch (error) {
      wx.showToast({
        title: '添加失败，请重试',
        icon: 'none'
      });
    }
  },

  // 更新购物车角标
  updateCartBadge() {
    const cart = wx.getStorageSync('cart') || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalCount > 0) {
      wx.setTabBarBadge({
        index: 2, // 购物车tab索引
        text: totalCount.toString()
      });
    } else {
      wx.removeTabBarBadge({
        index: 2
      });
    }
  },

  // 立即购买
  buyNow() {
    wx.navigateTo({
      url: '/pages/order/confirm'
    });
  }
})