// 导入vant FieldRule 类型
import type { FieldRule } from 'vant'

// 验证手机号
const mobileRule: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

// 验证密码
const passwordRule: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]

export { mobileRule, passwordRule }
