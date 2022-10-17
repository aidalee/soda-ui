import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  // name的值不能重复
  {
    path: '/',
    name: '首页',
    component: () => import('./layout/home.vue')
  },
  {
    path: '/components',
    component: () => import('./layout/docs.vue'),
    redirect: '/componets/button',
    children: [
      {
        path: 'button',
        name: 'doc-button',
        component: () => import('./docs/components/button/index.md')
      },
      {
        path: 'list',
        name: 'doc-list',
        component: () => import('./docs/components/list/index.md')
      }
    ]
  },
  {
    path: '/demo',
    component: () => import('./layout/app.vue'),
    redirect: '/demo/button',
    children: [
      {
        path: 'button',
        name: 'demo-button',
        component: () => import('./docs/components/button/demo.vue')
      },
      {
        path: 'list',
        name: 'demo-list',
        component: () => import('./docs/components/list/demo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
