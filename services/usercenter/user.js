import { request } from '../../utils/request';

/**
 * 更新用户信息
 * @param {Object} userData - 用户数据
 * @param {string} userData.nickname - 用户名
 * @param {string} userData.phone - 电话号码
 * @param {string} userData.address - 收货地址
 * @returns {Promise} 返回更新结果的Promise
 */
export function updateUserInfo(userData) {
  return request({
    url: '/api/account/update',
    method: 'put',
    data: {
      nickname: userData.nickname,
      phone: userData.phone,
      avatar: userData.avatar,
    }
  });
}