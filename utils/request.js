import { baseUrl } from './baseConfig'
import { getToken } from './util';

export function request(params) {
  const token = getToken();
  let header = null;
  if(token && params.url !== '/api/auth/wxLogin'){
    header = {
      'Authorization': `Bearer ${token}`
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + params.url,
      method: params.method || 'get',
      data: params.data || {},
      header,
      success: (res) => {
        res.data.success = false
        // 判断请求是否成功
        if (String(res.statusCode).startsWith('2')) {
          // 判断业务状态码
          if (res.data.code === 200) {
            res.data.success = true
            resolve(res.data)
          } else {
            reject(res.data)
          }
        } else {
          if(res.data.code === 401){
           wx.showModal({
              title: '提示信息',
              content: '您的登录已失效，请重新登录',
              showCancel: false,
              confirmText: '确定',
              confirmColor: '#576B95',
            }).then(res => {
              if(res.confirm){
                wx.navigateTo({
                  url: '/pages/login/index',
                });
              }
            })
          }
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err.data)
      }
    })
      
  })
}