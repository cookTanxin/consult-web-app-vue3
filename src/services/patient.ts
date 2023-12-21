// 请求库
import request from '@/utils/request'
// 类型
import type { Patient, PatientFormData } from '@/types/patient'
// type
import type {PartialConsult} from '@/types/consult'

// 问诊-查询患者列表信息
export function getPatientListdata() {
  return request<Patient[]>('/patient/mylist', 'get')
}

// 问诊-添加患者信息
export function addPatient(data: PatientFormData) {
  return request('/patient/add', 'post', data)
}

// 问诊-编辑患者信息
export function updatePatient(data: any) {
  return request('/patient/update', 'put', data)
}

// 问诊-删除患者信息
export function deletePatient(id: string) {
  return request(`/patient/del/${id}`, 'delete')
}

// 问诊-查询患者详情
export function queryPatientInfo(id: string) {
  return request<Patient>(`/patient/info/${id}`)
}

// 问诊-保存/修改问诊订单 创建订单号
export function createOrderId(data:PartialConsult) {
  return request<{id:string}>('/patient/consult/order','post',data)
}