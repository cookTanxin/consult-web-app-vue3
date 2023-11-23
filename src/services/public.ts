// 用户返回数据类型
import type { User, MessageCodeType } from '@/types/user'
// 请求库
import request from '@/utils/request'

// 登录--密码登录
export function loginPassword(mobile: string, password: string) {
  return request<User>('/login/password', 'post', { mobile, password })
}

// 获取手机验证码
export function getMobileCode(mobile: string, type: MessageCodeType) {
  return request<{ code: string }>('/code', 'get', { mobile, type })
}

// 登录--手机验证码登录
export function loginCode(mobile: string, code: string) {
  return request<User>('/login', 'post', { mobile, code })
}
