import { PrescriptionStatus, MsgType, OrderType } from '@/enums'
import type { Image, Consult } from '@/types/consult'
import type { Patient } from '@/types/patient'
import type { Doctor } from '@/types/home'
export type Medical = {
  /** 药品ID */
  id: string
  /** 药品名称 */
  name: string
  /** 金额 */
  amount: string
  /** 药品图片 */
  avatar: string
  /** 规格信息 */
  specs: string
  /** 用法用量 */
  usageDosag: string
  /** 数量 */
  quantity: string
  /** 是否处方，0 不是 1 是 */
  prescriptionFlag: 0 | 1
}

export type Prescription = {
  /** 处方ID */
  id: string
  /** 药品订单ID */
  orderId: string
  /** 创建时间 */
  createTime: string
  /** 患者名称 */
  name: string
  /** 问诊记录ID */
  recordId: string
  /** 性别 0 女 1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue: ''
  /** 年龄 */
  age: number
  /** 诊断信息 */
  diagnosis: string
  /** 处方状态 */
  status: PrescriptionStatus
  /** 药品清单 */
  medicines: Medical[]
}

export type EvaluateDoc = {
  /** 评价ID */
  id?: string
  /** 评分 */
  score?: number
  /** 内容 */
  content?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人 */
  creator?: string
}

export type Message = {
  /** 消息ID */
  id: string
  /** 消息类型 */
  msgType: MsgType
  /** 发信人 */
  from?: string
  /** 发信人ID */
  fromAvatar?: string
  /** 收信人 */
  to?: string
  /** 收信人头像 */
  toAvatar?: string
  /** 创建时间 */
  createTime: string
  /** 消息主体 */
  msg: {
    /** 文本内容 */
    content?: string
    /** 图片对象 */
    picture?: Image
    /** 问诊记录，患者信息 */
    consultRecord?: Consult & {
      patientInfo: Patient
    }
    /** 处方信息 */
    prescription?: Prescription
    /** 评价信息 */
    evaluateDoc?: EvaluateDoc
  }
}

// 消息分组列表
export type TimeMessages = {
  /** 分组消息最早时间 */
  createTime: string
  /** 消息数组 */
  items: Message[]
  /** 订单ID */
  orderId: string
  /** 会话ID */
  sid: string
}

// 问诊订单单项信息
export type ConsultOrderItem = Consult & {
  /** 创建时间 */
  createTime: string
  /** 医生信息 */
  docInfo?: Doctor
  /** 患者信息 */
  patientInfo: Patient
  /** 订单编号 */
  orderNo: string
  /** 订单状态 */
  status: OrderType
  /** 状态文字 */
  statusValue: string
  /** 类型问诊文字 */
  typeValue: string
  /** 倒计时时间 */
  countdown: number
  /** 处方ID */
  prescriptionId?: string
  /** 评价ID */
  evaluateId: number
  /** 应付款 */
  payment: number
  /** 优惠券抵扣 */
  couponDeduction: number
  /** 积分抵扣 */
  pointDeduction: number
  /** 实付款 */
  actualPayment: number
}
