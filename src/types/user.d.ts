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
