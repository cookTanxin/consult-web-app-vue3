// 导入pinia
import { defineStore } from 'pinia'
// vue
import { ref } from 'vue'
// type
import type { PartialConsult, IllnessFormData } from '@/types/consult'
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
    // 设置患者表单数据
    const setIllnessFormData = (formData: IllnessFormData) => {
      consultData.value.illnessDesc = formData.illnessDesc
      consultData.value.illnessTime = formData.illnessTime
      consultData.value.consultFlag = formData.consultFlag
      consultData.value.pictures = formData.pictures
    }
    // 设置患者id
    const setPatientId = (id: string) => {
      consultData.value.patientId = id
    }
    // 清空表单信息
    const clearConsultFormData = () => {
      consultData.value = {}
    }
    // 设置优惠卷id
    const setcouponId = (id:string) =>{
      consultData.value.couponId = id
    }
    return {
      setType,
      setillnessType,
      consultData,
      setdepId,
      setIllnessFormData,
      setPatientId,
      clearConsultFormData,
      setcouponId
    }
  },
  {
    persist: true
  }
)

export { useConsult }
