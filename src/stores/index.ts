import { createPinia } from 'pinia'
// 全局数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 初始化创建 pinia
const pinia = createPinia().use(piniaPluginPersistedstate)

// user 模块
export * from './modules/user'
// consult 模块
export * from './modules/consult'

export default pinia
