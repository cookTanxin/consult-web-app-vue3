// 请求库
import type { AllCate, OrderPre, orderPreParams,PayOrderParams } from '@/types/consult'
import request from '@/utils/request'

// 找医生--查询所有科室-层级
export function getAllCate() {
  return request<AllCate[]>('/dep/all', 'GET')
}

// 问诊-支付页面-计算就诊信息和抵扣信息
export function getOrderPreData(params: orderPreParams) {
  return request<OrderPre>('/patient/consult/order/pre', 'get', params)
}

// 订单-支付接口
export function payOrderData(data: PayOrderParams){
  return request<{payUrl:string}>('/patient/consult/pay','post',data)
}