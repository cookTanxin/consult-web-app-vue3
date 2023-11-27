// 患者数据类型
export interface Patient {
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: number
  // 性别 1男 0女
  gender?: number
  // 性别值
  genderValue?: string
  // 年龄
  age: number
  // id
  id?: string
}

export type PatientFormData = {
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0 | 1
  defaultFlag: number
  // 性别，1：男，0：女
  gender: number
}
