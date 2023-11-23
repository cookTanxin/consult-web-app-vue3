export type User = {
  // 令牌
  token: string
  // 刷新token
  refreshToken: string
  // 头像
  avatar: string
  // 脱敏手机号，带星号的手机号
  mobile: string
  // 用户名
  account: string
  // 用户id
  id: string
}

// 获取验证类型 使用联合类型 字面量 login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录，区分验证码
export type MessageCodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'
