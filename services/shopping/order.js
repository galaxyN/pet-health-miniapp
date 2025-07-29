import { request } from '../../utils/request';

// 下单
export function createOrders(params) {
  return request({
    url: '/api/shopping/orders',
    method: 'post',
    data: params
  })
}

// 获取订单列表
export function getOrderList(params) {
  return request({
    url: `/api/shopping/orders`,
    method: 'get',
    params
  })
}

// 获取订单详情
export function getOrderDetail(orderId) {
  return request({
    url: `/api/shopping/orders/${orderId}`,
    method: 'get'
  })
}

// 获取订单统计
export function getOrderStats() {
  return request({
    url: `/api/shopping/orders/stats`,
    method: 'get'
  })
}
