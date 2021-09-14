import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/server/tokens/generate-token/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/server/tokens/generate-token/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/server/tokens/remove-token/',
    method: 'post'
  })
}
