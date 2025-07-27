import { request } from '../../utils/request';

export function login(params) {
  return request({
    url: '/api/auth/wxLogin',
    method: 'post',
    data: params
  })
}

/** 登录 */
export function fetchLogin(params) {
  return request({
    url: '/api/auth/wxLogin',
    method: 'post',
    data: params
  })
}

/** 注册 */
export function fetchRegister(params) {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data: params
  })
}

/** 获取用户信息 */
export function accountProfile(params) {
    return request({
        url: '/api/account/profile',
        method: 'get',
        data: params
    })
}