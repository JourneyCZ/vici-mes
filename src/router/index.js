import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/sale',
      redirect: '/order'
    },
    {
      path: '/sale/order',
      name: '销售订单',
      component: () => import('@/views/sale/order/index.vue')
    }
  ]
})

export default router
