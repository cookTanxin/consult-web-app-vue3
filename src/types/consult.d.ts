import type { ConsultType, IllnessTime } from '@/enums'

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

export { Child, AllCate, PartialConsult }
