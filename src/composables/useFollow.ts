// api
import { followData } from '@/services/user'
// vue
import { ref } from 'vue'
// types
import type { followType } from '@/types/user'
// 提示
import { showToast } from 'vant'
// 组合式api
const useFollow = (type: followType = 'doc') => {
  // 关注按钮是否正在更新
  const btnLoading = ref(false)
  // 点击关注
  const followClick = async (item: { id: string; likeFlag: number }) => {
    const params = {
      type,
      id: item.id
    }
    // 按钮加载
    btnLoading.value = true
    try {
      await followData(params)
      if (item.likeFlag == 1) {
        showToast('已取关')
      } else {
        showToast('已关注')
      }
      // 更新视图
      item.likeFlag = item.likeFlag === 1 ? 0 : 1

      // 提示
      btnLoading.value = false
    } catch (e) {
      // 失败执行函数
      btnLoading.value = false
    } finally {
      // 不管成功还是失败都会执行
      btnLoading.value = false
    }
  }
  return {
    // 更新状态
    btnLoading,
    // 更新的方法
    followClick
  }
}

export { useFollow }
