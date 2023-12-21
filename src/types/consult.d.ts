import type { ConsultType, IllnessTime,payType } from '@/enums'

// 科室类型数据
type Child = {
  // 子级id
  id: string
  // 子级name
  name: string
}

// 查询所有科室 数据类型
type AllCate = {
  // 科室id--一级科室
  id: string
  // 科室名称
  name: string
  // 子数据
  child: Child[]
}

// 图片列表
type Image = {
  // 图片id
  id: string
  // 图片地址
  url: string
}

// 问诊记录
type Consult = {
  /** 问诊记录ID */
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型 0 普通 1 三甲
  illnessType: 0 | 1
  /** 科室ID */
  depId: string
  /** 疾病描述 */
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  /** 是否就诊过，0 未就诊过  1 就诊过 */
  consultFlag: 0 | 1
  // 图片数组
  pictures: Image[]
  /** 患者ID */
  patientId: string
  /** 优惠券ID */
  couponId: string
}

// 问诊记录数据全部为可选
type PartialConsult = Partial<Consult>

// 患者填写表单类型 pick 摘取 omit 省略
type IllnessFormData = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>


// 响应数据类型 类型数据
type OrderPre = {
  // 1问医生2极速问诊2开药问诊--默认是1
  type: ConsultType
  // 极速问诊类型：0普通1三甲,极速问题必须有值
  illnessType: 0 | 1
  // 应付款/价格-图文或者极速的费用，极速普通10元，三甲39元
  payment: 10 | 39
  // 积分可抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 使用的优惠券id-使用优惠券时，返回
  couponId: string
  // 实付金额
  actualPayment: number
}

// 预支付请求参数 类型
type orderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>

// 支付订单请求参数
interface PayOrderParams {
  // 支付方式0微信支付，1支付宝2云闪付
  paymentMethod: payType
  // 订单id
  orderId:string
  // 回调地址
  payCallback: string

}

export {
  Child,
  AllCate,
  PartialConsult,
  IllnessFormData,
  Image,
  OrderPre,
  orderPreParams,
  PayOrderParams
}
