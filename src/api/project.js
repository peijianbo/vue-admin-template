import request from '@/utils/request'

export function projectList() {
  return request({
    url: '/project/projects/',
    method: 'get',
    params: { }
  })
}
