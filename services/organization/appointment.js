import { request } from '../../utils/request';

export function appointments(params) {
  return request({
    url: `/api/appointments`,
    method: 'post',
    data: params
  })
}