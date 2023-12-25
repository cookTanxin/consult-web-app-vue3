// 枚举
import { IllnessTime } from '@/enums'
// 路由白名单
const withRouter = ['/login']
// app 名称
const appName = '庸医问诊'
// 我的快捷工具链接数据
const toolUrlList = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
// 首页标签
const homeTabs = [
  { title: '关注', type: 'like' },
  { title: '推荐', type: 'recommend' },
  { title: '减脂', type: 'fatReduction' },
  { title: '健康饮食', type: 'food' }
]

// 患病时间1一周内2一月内3半年内4半年以上
const illnessTimeOptions = [
  { name: '一周内', value: IllnessTime.Week },
  { name: '一月内', value: IllnessTime.Month },
  { name: '半年内', value: IllnessTime.HalfYear },
  { name: '半年以上', value: IllnessTime.More }
]
// 找医生/极速问诊-是否就诊过0未就诊1就诊过
const consultFlagOptions = [
  { name: '未就诊', value: 0 },
  { name: '就诊过', value: 1 }
]

// baseUrl
const baseURL = 'https://consult-api.itheima.net'

export {
  withRouter,
  appName,
  toolUrlList,
  homeTabs,
  baseURL,
  illnessTimeOptions,
  consultFlagOptions
}
