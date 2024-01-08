// api
import { deleteOrder } from '@/services/user'
import { ref } from 'vue'
import type { OrderConsultItem } from '@/types/user'
import { showToast, showConfirmDialog } from 'vant'
// 删除订单 公共方法
const useOrderDelete = (cb: () => void) => {
  // 准备一个loading 加载状态值
  const loading = ref(false)
  // 删除请求函数
  const onDeleteOrder = (item: OrderConsultItem) => {
    showConfirmDialog({
      title: '温馨提示',
      message: '确定删除该订单吗?'
    })
      .then(async () => {
        // 按钮loading 加载状态
        loading.value = true
        try {
          await deleteOrder(item.id)
          showToast('订单删除成功!')
          // 判断是否有回调函数
          cb && cb()
        } catch (e) {
          showToast('删除失败')
        } finally {
          loading.value = false
        }
      })
      .catch(() => {
        showToast('已取消')
      })
  }
  return {
    loading,
    onDeleteOrder
  }
}

export { useOrderDelete }
