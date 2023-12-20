<template>
  <c-nav-bar :leftArrow="true" title="选择科室" border></c-nav-bar>
  <div class="consult-dep">
    <div class="loading-area" v-if="LoadingData">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <template v-else>
      <div class="consult-dep-left">
        <div
          class="consult-dep-left-item"
          :class="{ active: selectAdmin == index }"
          v-for="(item, index) in allCate"
          :key="item.id"
          @click="onSelectCate(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="consult-dep-right">
        <template v-if="allCate[selectAdmin]?.child.length > 0">
          <RouterLink
            to="/consult/illness"
            @click="useStore.setdepId(childrenItem.id)"
            v-for="(childrenItem, cindex) in allCate[selectAdmin]?.child"
            :key="cindex"
          >
            <span>{{ childrenItem.name }}</span>
          </RouterLink>
        </template>
        <template v-else>暂无数据</template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// vue
import { ref, onMounted } from 'vue'
// api
import { getAllCate } from '@/services/consult'
// 组合式api
import { useLoading } from '@/composables/useLoading'
// types
import type { AllCate } from '@/types/consult'
// store
import { useConsult } from '@/stores/index'
// 数据是否加载
const { loadingMethod, LoadingData } = useLoading()
// 全部科室数据
const allCate = ref<AllCate[]>([])
// store
const useStore = useConsult()
// 当前选中科室
const selectAdmin = ref(0)
// 获取全部数据分类
const getAllCateData = async () => {
  const data = await getAllCate()
  allCate.value = data.data
  // 数据加载完毕
  loadingMethod(false)
}
// 选择左侧科室
const onSelectCate = (index: number) => {
  selectAdmin.value = index
}
onMounted(() => {
  // 获取所有科室数据
  getAllCateData()
})
</script>

<style scoped lang="scss">
.loading-area {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.consult-dep {
  width: 100%;
  display: flex;
  height: 100vh;
  .consult-dep-left {
    width: 40%;
    overflow-y: scroll;
    background-color: #f5f5f5;
    .consult-dep-left-item {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cp-tag);
      &.active {
        background-color: #fff;
        color: var(--cp-text1);
      }
    }
  }
  .consult-dep-right {
    width: 60%;
    padding: 16px;
    overflow: scroll;
    box-sizing: border-box;
    a {
      height: 40px;
      display: block;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--cp-dark);
    }
  }
}
</style>
