// 用户返回数据类型
import type { User } from '@/types/user'
// 请求库
import request from '@/utils/request'

// 登录--密码登录
export function loginPassword(mobile: string, password: string) {
  return request<User>('/login/password', 'post', { mobile, password })
}
