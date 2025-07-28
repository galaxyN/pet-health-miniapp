import { request } from '../../utils/request';

export function getOrgList(params) {
  return request({
    url: `/api/orgs`,
    method: 'get',
    data: params
  })
}