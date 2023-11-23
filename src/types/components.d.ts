// 自定义导航组件
import CNavBar from '@/components/CNavBar/index.vue'
// 自定义图标
import CIcon from '@/components/CIcon/index.vue'

declare module 'vue' {
  interface GlobalComponents {
    CNavBar: typeof CNavBar
    CIcon: typeof CIcon
  }
}
