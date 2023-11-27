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

// 验证用户是否输入姓名
const userNameRule: FieldRule[] = [
  { required: true, message: '请输入真实姓名' },
  { pattern: /^[\u4e00-\u9fa5]+$/, message: '请输入中文' }
]

// 验证是否输入身份证号码
const idcardRule: FieldRule[] = [
  { required: true, message: '请输入身份证号码' },
  {
    pattern:
      /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}(\d|X|x)$/,
    message: '身份证号码有误'
  }
]
export { mobileRule, passwordRule, userNameRule, idcardRule }
