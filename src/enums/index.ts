// 极速问诊类型 订单类型1问医生2极速问诊2开药问诊--默认是1
export enum ConsultType {
  // 找医生
  Doctor = 1,
  // 极速问诊
  Fast = 2,
  // 开药问诊
  Medication = 3
}

// 问诊时间枚举 找医生/极速问诊必有-患病时间1一周内2一月内3半年内4半年以上 需要创建一个仓库
export enum IllnessTime {
  // 一周内
  Week = 1,
  // 一月内
  Month,
  // 半年内
  HalfYear,
  // 半年以上
  More
}

// 消息类型
export enum MsgType {
  /** 文字聊天 */
  MsgText = 1,
  /** 消息聊天 */
  MsgImage = 4,
  /** 患者信息 */
  CardPat = 21,
  /** 处方信息 */
  CardPre = 22,
  /** 未评价信息 */
  CardEvaForm = 23,
  /** 已评价信息 */
  CardEva = 24,
  /** 通用通知 */
  Notify = 31,
  /** 温馨提示 */
  NotifyTip = 32,
  /** 取消提示 */
  NotifyCancel = 33
}

// 处方状态
export enum PrescriptionStatus {
  /** 未付款 */
  NotPayment = 1,
  /** 已付款 */
  Payment = 2,
  /** 已失效 */
  Invalid = 3
}

// 支付方式 支付方式0微信支付，1支付宝2云闪付
export enum payType {
  Wechat,
  alipay,
  ysf
}
