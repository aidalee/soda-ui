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
      },
      {
        path: 'icon',
        name: 'doc-icon',
        component: () => import('./docs/components/icon/index.md')
      },
      {
        path: 'field',
        name: 'doc-field',
        component: () => import('./docs/components/field/index.md')
      },
      {
        path: 'card',
        name: 'doc-card',
        component: () => import('./docs/components/card/index.md')
      },
      {
        path: 'tab',
        name: 'doc-tab',
        component: () => import('./docs/components/tab/index.md')
      },
      {
        path: 'sticky',
        name: 'doc-sticky',
        component: () => import('./docs/components/sticky/index.md')
      },
      {
        path: 'image-upload',
        name: 'doc-image-upload',
        component: () => import('./docs/components/image-upload/index.md')
      },
      {
        path: 'swipe',
        name: 'doc-swipe',
        component: () => import('./docs/components/swipe/index.md')
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
      },
      {
        path: 'icon',
        name: 'demo-icon',
        component: () => import('./docs/components/icon/demo.vue')
      },
      {
        path: 'field',
        name: 'demo-field',
        component: () => import('./docs/components/field/demo.vue')
      },
      {
        path: 'card',
        name: 'demo-card',
        component: () => import('./docs/components/card/demo.vue')
      },
      {
        path: 'tab',
        name: 'demo-tab',
        component: () => import('./docs/components/tab/demo.vue')
      },
      {
        path: 'sticky',
        name: 'demo-sticky',
        component: () => import('./docs/components/sticky/demo.vue')
      },
      {
        path: 'image-upload',
        name: 'demo-image-upload',
        component: () => import('./docs/components/image-upload/demo.vue')
      },
      {
        path: 'swipe',
        name: 'demo-swipe',
        component: () => import('./docs/components/swipe/demo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
