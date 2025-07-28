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

export function editPet(params) {
  const id = params?.id;
  delete params.id;
  return request({
    url: `/api/pets/${id}`,
    method: 'put',
    data: params
  })
}

export function deletePet(id) {
  return request({
    url: `/api/pets/${id}`,
    method: 'delete',
  })
}
