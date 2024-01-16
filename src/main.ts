import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// svg
import 'virtual:svg-icons-register'
// pinia
import pinia from '@/stores/index'
// 移动端调试工具
import eruda from 'eruda'
// 判断是否为开发环境
if (import.meta.env.DEV) {
  eruda.init()
}
// vant 样式
import 'vant/lib/index.css'
// style
import './styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

console.log(import.meta.env.VITE_APP_TITLE)

app.mount('#app')
