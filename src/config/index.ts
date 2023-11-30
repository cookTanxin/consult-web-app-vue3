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
export { withRouter, appName, toolUrlList, homeTabs }
