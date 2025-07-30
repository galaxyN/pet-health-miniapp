import { request } from '../../utils/request';

/** 获取购物车列表 */
export function getCartList() {
  return request({
    url: '/api/shopping/cart',
    method: 'get'
  })
}

// 加入购物车
export function addToCart(params) {
  return request({
    url: '/api/shopping/cart/add',
    method: 'post',
    data: params
  })
}
