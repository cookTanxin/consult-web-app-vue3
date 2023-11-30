// 请求库
import request from '@/utils/request'
// 首页列表请求参数类型
import type {
  FollowDoctorPage,
  HomeListParams,
  KnowledgePage
} from '@/types/home'
// 公共分页查询参数
import type { ParamsPage } from '@/types/common'

//首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export function getHomeListData(params: HomeListParams) {
  return request<KnowledgePage>('/patient/home/knowledge', 'get', params)
}

// 首页-关注的医生列表
export function followDoctorListData(params: ParamsPage) {
  return request<FollowDoctorPage>('/home/page/doc', 'get', params)
}
