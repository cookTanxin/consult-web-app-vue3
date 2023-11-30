// 首页查询type
import type { ParamsPage } from '@/types/common'

export type HomeTabType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 首页列表查询参数
export type HomeListParams = ParamsPage & {
  // 文章类型
  type: HomeTabType
}

// 文章列表信息类型
export type Knowledge = {
  id: string
  /** 标题 */
  title: string
  /** 封面[] */
  coverUrl: string[]
  /** 标签[] */
  topics: string[]
  /** 收藏数 */
  collectionNumber: number
  /** 评论数 */
  commentNumber: number
  /** 医生名称 */
  creatorName: string
  /** 医生头像 */
  creatorAvatar: string
  /** 医生医院 */
  creatorHospatalName: string
  /** 关注文章 */
  likeFlag: 0 | 1
  /** 内容 */
  content: string
  /** 医生科室 */
  creatorDep: string
  /** 医生职称 */
  creatorTitles: string
  /** 医生ID */
  creatorId: string
}

// 文章列表类型
export type KnowledgeList = Knowledge[]

// 返回数据类型 带分页
export type KnowledgePage = {
  // 总页数
  pageTotal: number
  //总条数
  total: number
  // 数据列表
  rows: KnowledgeList
}

// 关注医生数据项
export type Doctor = {
  /** 医生ID */
  id: string
  /** 医生名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 医院名称 */
  hospitalName: string
  /** 医院等级 */
  gradeName: string
  /** 科室 */
  depName: string
  /** 职称 */
  positionalTitles: string
  /** 是否关注，0 未关注 1 已关注 */
  likeFlag: 0 | 1
  /** 接诊服务费 */
  serviceFee: number
  /** 接诊人数 */
  consultationNum: number
  /** 评分 */
  score: number
  /** 主攻方向 */
  major: string
}

// 关注医生列表
export type FollowDoctor = Doctor[]

// 关注医生列表带分页
export type FollowDoctorPage = {
  // 总页数
  pageTotal: number
  //总条数
  total: number
  // 数据列表
  rows: FollowDoctor
}
