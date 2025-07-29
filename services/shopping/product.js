import { request } from '../../utils/request';

// 获取商品分类
export function getCategories(params) {
  return request({
    url: '/api/shopping/categories',
    method: 'get',
    data: params
  })
}

// 获取商品列表
export function getProductList(params) {
  return request({
    url: '/api/shopping/products',
    method: 'get',
    data: params
  })
}

// 获取商品详情
export function getProducInfo(params) {
  return request({
    url: `/shopping/products/${id}`,
    method: 'get',
    data: params
  })
}
