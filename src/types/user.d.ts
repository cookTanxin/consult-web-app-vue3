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

// 关注类型 联合类型 topic百科话题,knowledge百科文章,doc医生,disease疾病
export type followType = 'topic' | 'knowledge' | 'doc' | 'disease'

// 获取验证类型 使用联合类型 字面量 login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录，区分验证码
export type MessageCodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

// 问诊中信息
type ConsultationInfo = {
  // 医生id
  id: string
  // 医生姓名
  name: string
  // 医生头像
  avatar: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 订单id
  orderId: string
}
// 用户中心类型
export type UserinfoData = Omit<User, 'token'> & {
  // 关注数量
  likeNumber: number
  // 收藏数量
  collectionNumber: number
  // 我的总积分
  score: number
  // 我的优惠券数量
  couponNumber: number
  // 订单信息
  orderInfo: {
    // 待付款
    paidNumber: number
    // 待发货
    receivedNumber: number
    // 待收货
    shippedNumber: number
    // 已完成
    finishedNumber: number
  }
  // 问诊信息
  consultationInfo: ConsultationInfo[]
}
