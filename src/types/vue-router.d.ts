// typings.d.ts 或 router.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
