<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConsultOrderItem from './consultOrderitem.vue'
// api
import { getUserConsultList } from '@/services/user'
import type { OrderConsultItem } from '@/types/user'
const onLoad = () => {
  // 获取列表数据
  getListData()
}
interface Props {
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 2
})
// 当前页
const currentPage = ref(1)
// finished state
const finished = ref(false)
// loading state
const loading = ref(false)
// list data
const listData = ref<OrderConsultItem[]>([])

// 获取列表数据
const getListData = async () => {
  const data = await getUserConsultList({
    type: props.type,
    current: currentPage.value,
    pageSize: 10
  })
  listData.value.push(...data.data.rows)
  if (listData.value.length >= data.data.total) {
    finished.value = true
  } else {
    currentPage.value++
  }
  loading.value = false
}
// 数据删除成功 回调事件
const onDeleteRefresh = (orderItem: OrderConsultItem) => {
  // 筛选掉删除的订单数据
  listData.value = listData.value.filter((item) => item.id != orderItem.id)
}
</script>

<template>
  <div class="consultList-content">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="consult-list-content">
        <consult-order-item
          v-for="(item, index) in listData"
          :key="index"
          :item="item"
          @delete-refresh="onDeleteRefresh"
        ></consult-order-item>
      </div>
    </van-list>
  </div>
</template>

<style scoped lang="scss">
.consult-list-content {
  padding: 10px;
  box-sizing: border-box;
}
</style>
