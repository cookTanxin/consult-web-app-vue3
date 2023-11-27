// 请求库
import request from '@/utils/request'
// 用户信息类型
import type { UserinfoData } from '@/types/user'

// 我的-获取个人用户信息
export function getUserInfo() {
  return request<UserinfoData>('/patient/myUser', 'get')
}
