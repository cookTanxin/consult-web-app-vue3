// vue
import { ref } from 'vue'

const useLoading = () => {
  // 数据是否加载
  const LoadingData = ref(true)
  // 数据加载完毕 设置为fasle
  const loadingMethod = (flag: boolean) => {
    LoadingData.value = flag
  }

  return {
    loadingMethod,
    LoadingData
  }
}

export { useLoading }
