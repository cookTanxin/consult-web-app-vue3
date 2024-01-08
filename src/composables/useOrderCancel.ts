// 取消订单 组合式方法
import { ref } from 'vue'
import type { OrderConsultItem } from '@/types/user'
import { showConfirmDialog, showToast } from 'vant'
import { cancelOrder } from '@/services/user'
import { OrderType } from '@/enums'

const useOrderCancel = () => {
  // 按钮是否加载
  const loading = ref(false)
  // 取消订单方法
  const orderCancel = async (item: OrderConsultItem) => {
    showConfirmDialog({
      title: '温馨提示',
      message: '确定取消该订单吗?'
    })
      .then(async () => {
        loading.value = true
        try {
          await cancelOrder(item.id)
          // 提示
          showToast('取消订单成功!')
          // 改变订单状态
          item.status = OrderType.ConsultCancel
        } catch (e) {
          showToast('取消订单失败')
        } finally {
          // 失败成功都要取消按钮加载
          loading.value = false
        }
      })
      .catch(() => {
        showToast('已取消')
      })
  }
  return {
    loading,
    orderCancel
  }
}

export { useOrderCancel }
