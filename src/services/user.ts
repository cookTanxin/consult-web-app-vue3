// 请求库
import request from '@/utils/request'
// 用户信息类型
import type { UserinfoData } from '@/types/user'
// 通用类型
import type { FollowParams } from '@/types/common'

// 我的-获取个人用户信息
export function getUserInfo() {
  return request<UserinfoData>('/patient/myUser', 'get')
}

// 关注-关注操作 request 返回类型 泛型参数 是要你页面中用到的 才用去传递泛型参数
export function followData(data: FollowParams) {
  return request('/like', 'post', data)
}