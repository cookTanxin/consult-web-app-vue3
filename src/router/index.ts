import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页面
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
