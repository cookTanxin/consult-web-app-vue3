// 请求库
import request from '@/utils/request'
import type { EvaluateDoc } from '@/types/room'

//问诊-订单-评价医生
export function commentDoctor(data: {
  docId: string
  orderId: string
  score: number
  content: string
  anonymousFlag: number
}) {
  return request<EvaluateDoc>('/patient/order/evaluate', 'post', data)
}
