// 请求库
import request from '@/utils/request'
// 用户信息类型
import type {
  ConsultListItem,
  getConsultParams,
  UserinfoData
} from '@/types/user'
// 通用类型
import type { FollowParams } from '@/types/common'

// 我的-获取个人用户信息
export function getUserInfo() {
  return request<UserinfoData>('/patient/myUser', 'get')
}

// 关注-关注操作 request 返回类型 泛型参数 是要你页面中用到的 才用去传递泛型参数
export function followData(data: FollowParams) {
  return request('/like', 'post', data)
}

// 获取用户问诊列表数据 问诊记录-订单列表-找医生、极速问诊、开药问诊
export function getUserConsultList(data: getConsultParams) {
  return request<ConsultListItem>('/patient/consult/order/list', 'get', data)
}

// 订单-取消订单
export function cancelOrder(id: string | number) {
  return request(`/patient/order/cancel/${id}`, 'put')
}

// 删除订单
export function deleteOrder(id: string | number) {
  return request(`/patient/order/${id}`, 'delete')
}
