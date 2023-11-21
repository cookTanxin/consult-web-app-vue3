// pinia
import { defineStore } from 'pinia'
// vue
import { ref } from 'vue'
// 类型文件
import type { User } from '@/types/user'
// 用户数据 用户数据存储 用户数据删除
export const useUserStore = defineStore(
  'user-store',
  () => {
    // 用户数据
    const user = ref<User>()
    // 设置用户数据持久化数据
    const setUser = (u: User) => {
      user.value = u
    }
    // 删除用户数据
    const delUser = () => {
      user.value = undefined
    }
    return {
      user,
      setUser,
      delUser
    }
  },
  {
    persist: true
  }
)
