// 请求库
import type { AllCate } from '@/types/consult'
import request from '@/utils/request'

// 找医生--查询所有科室-层级
export function getAllCate() {
  return request<AllCate[]>('/dep/all', 'GET')
}
