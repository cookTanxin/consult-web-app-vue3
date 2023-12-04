// 科室类型数据
type Child = {
  // 子级id
  id: string
  // 子级name
  name: string
}

// 查询所有科室 数据类型
type AllCate = {
  // 科室id--一级科室
  id: string
  // 科室名称
  name: string
  // 子数据
  child: Child[]
}

export { Child, AllCate }
