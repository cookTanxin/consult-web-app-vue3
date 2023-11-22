// 自定义导航组件
import CnavBar from '@/components/c-nav-bar/index.vue'

declare module 'vue' {
  interface GlobalComponents {
    CnavBar: typeof CnavBar
  }
}
