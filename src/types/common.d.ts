import type { followType } from './user'
// 分类类型请求参数
export type ParamsPage = {
  // 当前页
  current: number
  // 每页多少条数据
  pageSize: number
}

// 关注请求参数类型
export type FollowParams = {
  // topic百科话题,knowledge百科文章,doc医生,disease疾病
  type: followType
  // id
  id: string
}

