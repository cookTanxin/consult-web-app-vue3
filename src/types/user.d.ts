import type { ParamsPage } from '@/types/common'
import { ConsultType, OrderType } from '@/enums'
import type { Patient } from '@/types/patient'
import type { Doctor } from '@/types/home'

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

// 获取用户问诊列表数据 请求参数类型
export type getConsultParams = ParamsPage & {
  // 列表类型
  type: ConsultType
}

export interface OrderConsultItem {
  // 订单id
  id: string
  // 订单编号
  orderNo: string
  // 订单类型1问医生2极速问诊2开药问诊--默认是1
  type: number
  // 订单创建时间
  createTime: string
  // 患者信息
  patientInfo: Patient
  // 病情--症状描述
  illnessDesc: string
  // 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上
  illnessTime: number
  // 咨询的医生--找医生
  docInfo: Doctor
  // 处方id信息
  prescriptionId: string
  // 就诊记录id信息
  recordId: string
  // 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
  status: OrderType
  // 订单状态：图文问诊或者开药问诊的订单-1待支付2待接诊3咨询中4已完成5已取消/药品订单-10待支付11待发货12待收货13已完成14已取消
  statusValue: string
  // 倒计时
  countdown: number
  // 是否已经评价1 已评价0 未评价
  evaluateFlag: string
  // 价格
  payment: number
}

// 问诊列表响应数据类型
export interface ConsultListItem {
  // 总条数
  total: number
  // 总页数
  pageTotal: number
  // 列表数据
  rows: OrderConsultItem[]
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
