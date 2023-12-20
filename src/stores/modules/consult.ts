// 导入pinia
import { defineStore } from 'pinia'
// vue
import { ref } from 'vue'
// type
import type { PartialConsult } from '@/types/consult'
// 枚举
import type { ConsultType } from '@/enums'

// 设置一个改变全局的仓库
const useConsult = defineStore(
  'consult-store',
  () => {
    // 仓库数据
    const consultData = ref<PartialConsult>({})
    // 设置问诊类型
    const setType = (type: ConsultType) => {
      consultData.value.type = type
    }
    // 设置快速问诊类型
    const setillnessType = (type: 0 | 1) => {
      consultData.value.illnessType = type
    }
    // 设置科室
    const setdepId = (id: string) => {
      consultData.value.depId = id
    }
    return {
      setType,
      setillnessType,
      consultData,
      setdepId
    }
  },
  {
    persist: true
  }
)

export { useConsult }
