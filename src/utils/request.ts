// 响应数据 泛型接口
import type { ResData } from '@/types/request'
// axios
import axios, { type Method } from 'axios'
// store
import { useUserStore } from '@/stores/index'
// vant
import { showToast } from 'vant'
// router
import router from '@/router'
// 实例化axios
const instance = axios.create({
  // 基础地址
  baseURL: 'https://consult-api.itheima.net',
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 请求携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器 401 处理
instance.interceptors.response.use(
  (res: any) => {
    // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
    if (res.data?.code !== 10000) {
      showToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    // 业务逻辑成功，响应数据 作为axios 成功的结果
    return res.data
  },
  (err: any) => {
    // store
    const store = useUserStore()
    // 401 拦截处理
    if (err.response?.status === 401) {
      showToast(err.response.data.message || '请求失败')
      // 清除用户数据
      store.delUser()
      // 跳转到登录界面 携带当前用户的url 登录完成以后跳转回来
      router.push({
        path: `/login`,
        query: {
          returnUrl: router.currentRoute.value.fullPath
        }
      })
    }
    return Promise.reject(err)
  }
)

const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<ResData<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export default request
