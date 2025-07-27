import { request } from '../../utils/request';

export function getPetList(id) {
  return request({
    url: `/api/pets/user/${id}`,
    method: 'get',
  })
}

export function addPet(params) {
  return request({
    url: `/api/pets/create`,
    method: 'post',
    data: params
  })
}

