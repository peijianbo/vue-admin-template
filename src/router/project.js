
export default [
  {
    path: '',
    name: 'ProjectList',
    component: () => import('@/views/project/ProjectList'),
    meta: { title: '项目列表', activeMenu: '/project/projects' }
  },
  {
    path: 'archived',
    name: 'ArchivedProject',
    component: () => import('@/views/project/ProjectArchivedList'),
    meta: { title: '归档项目', activeMenu: '/project/projects/archived' }
  },
  {
    path: 'create',
    name: 'ProjectCreate',
    component: () => import('@/views/project/ProjectCreate'),
    meta: { title: '创建项目', activeMenu: '/project/projects', action: 'create' },
    hidden: true
  }
]
