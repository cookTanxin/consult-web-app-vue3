import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// pinia
import pinia from '@/stores/index'
// vant 样式
import 'vant/lib/index.css'
// style
import './styles/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
