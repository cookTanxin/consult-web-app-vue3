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
export { withRouter, appName, toolUrlList }
