import { request } from '../../utils/request';

export function getCommentList(params) {
  return request({
    url: `/api/organization-reviews`,
    method: 'get',
    data: params
  })
}

export function addComment(params) {
  return request({
    url: `/api/organization-reviews`,
    method: 'post',
    data: params
  })
}