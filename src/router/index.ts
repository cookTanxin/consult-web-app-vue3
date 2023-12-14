// vue-router
import { createRouter, createWebHistory } from 'vue-router'
// 路由白名单
import { withRouter, appName } from '@/config'
// store
import { useUserStore } from '@/stores'
// 加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// vant
import { showToast } from 'vant'
// 进度条配置
NProgress.configure({
  showSpinner: false
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页面
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('@/views/login/index.vue')
    },
    // 地址页面
    {
      path: '/user/address',
      name: 'address',
      meta: { title: '用户地址' },
      component: () => import('@/views/user/address/index.vue')
    },
    // 我的问诊
    {
      path: '/user/consult',
      name: 'consult',
      meta: { title: '我的问诊' },
      component: () => import('@/views/user/consult/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      meta: { title: '家庭档案' },
      component: () => import('@/views/user/patient/index.vue')
    },
    // 急速问诊
    {
      path: '/consult/fast',
      name: 'consultFast',
      meta: { title: '急速问诊' },
      component: () => import('@/views/consult/fast/index.vue')
    },
    // 咨询科室
    {
      path: '/consult/dep',
      name: 'consultDep',
      meta: { title: '选择科室' },
      component: () => import('@/views/consult/dep/index.vue')
    },
    // 问诊记录信息页面
    {
      path: '/consult/illness',
      name: 'illness',
      meta: { title: '问诊记录' },
      component: () => import('@/views/consult/illness/index.vue')
    },
    // 支付页面
    {
      path: '/consult/pay',
      name: 'pay',
      meta: { title: '支付费用' },
      component: () => import('@/views/consult/pay/index.vue')
    },
    // 主布局 tabbar 页面
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/health',
          name: 'health',
          meta: { title: '健康' },
          component: () => import('@/views/health/index.vue')
        },
        {
          path: '/message',
          name: 'message',
          meta: { title: '消息' },
          component: () => import('@/views/message/index.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          meta: { title: '我的' },
          component: () => import('@/views/mine/index.vue')
        }
      ]
    }
  ]
})

// 全局路由守卫 前置
router.beforeEach((to, from) => {
  // 进度条加载
  NProgress.start()
  // 判断用户是否登录 是否在白名单路由中
  const userStore = useUserStore()
  // 判断用户是否登录 如果登录了再次到 login 不跳转 跳转回去
  if (userStore.user?.token && to.path === '/login') {
    showToast('已经登录了哦！')
    return from.path
  }
  if (!userStore.user?.token && !withRouter.includes(to.path)) {
    return '/login'
  }
})

// 全局路由守卫 后置
router.afterEach((to) => {
  // 设置页面标题 类型断言
  document.title = `${appName}-${to.meta.title as string}`
  // 进度条结束
  NProgress.done()
})

export default router
