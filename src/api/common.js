import request from '@/utils/request'

export function List(url, params) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function Create(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

export function Patch(url, data) {
  return request({
    url: url,
    method: 'patch',
    data
  })
}

export function Options(url) {
  return request({
    url: url,
    method: 'options'
  })
}

