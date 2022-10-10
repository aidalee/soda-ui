import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('./layout/home.vue')
  },
  // {
  //   path: '/home',
  //   name: '首页',
  //   component: () => import('./layout/home.vue')
  // },
  {
    path: '/components',
    component: () => import('./layout/docs.vue'),
    redirect: '/componets/button',
    children: [
      {
        path: 'button',
        name: 'Button 按钮',
        component: () => import('./docs/components/button/index.md')
      },
      {
        path: 'buttonw',
        name: 'Button 按钮2',
        component: () => import('./docs/components/button/index.md')
      }
    ]
  },
  // {
  //   path: '/demo/button',
  //   component: () => import('./docs/components/button/demo.vue'),
  // },
  {
    path: '/demo',
    component: () => import('./layout/app.vue'),
    children: [
      {
        path: 'button',
        name: 'button',
        component: () => import('./docs/components/button/demo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
