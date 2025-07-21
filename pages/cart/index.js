import Dialog from 'tdesign-miniprogram/dialog/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { fetchCartGroupData } from '../../services/cart/cart';

Page({
  data: {
    cartGroupData: null,
    orderList: [
      {
        id: 1,
        name: '法米娜成犬粮羊肉南瓜7kg通用博美马尔济斯',
        image: 'http://117.72.219.186:8080/image/store/01.jpg',
        status: '待支付'
      },
      {
        id: 2,
        name: 'worendao无人岛猫窝四季通用夏季猫窝半封闭式藤猫窝狗窝凉席款',
        image: 'http://117.72.219.186:8080/image/store/02.png',
        status: '已发货'
      },
      {
        id: 3,
        name: '瑞鹏宠物医院（中油店）',
        image: 'http://117.72.219.186:8080/image/store/03.png',
        status: '待支付'
      }
    ]
  },

  // 调用自定义tabbar的init函数，使页面与tabbar激活状态保持一致
  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.refreshData();
  },

  refreshData() {
    
  }

});
