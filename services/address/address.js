import { request } from '../../utils/request';

export function getAddressList(userId) {
  return request({
    url: `/api/address/user/${userId}`,
    method: 'get'
  })
}

export function fetchDeliveryAddress(addressId) {
  return request({
    url: `/api/address/${addressId}`,
    method: 'get'
  })
}