<script setup lang="ts" name="HomeList">
// vue
import { ref } from 'vue'
// 关注的医生
import LikeCom from './LikeCom.vue'
// 首页列表组件
import ListItem from './ListItem.vue'
// types
import type { LikeComType } from './types/likecom'
// types
import type { KnowledgeList, HomeTabType } from '@/types/home'
// api
import { getHomeListData } from '@/services/home'
// ref
const likeComRef = ref<LikeComType>()
// 是否正在加载中
const loading = ref(false)
// 是否加载完毕
const finished = ref(false)
// 是否正在下拉刷新
const refreshing = ref(false)
// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)
// 数组数据
const homeListData = ref<KnowledgeList>([])
// 子组件属性
type Props = {
  type: HomeTabType
}
const props = defineProps<Props>()
// 下拉刷新
const onRefresh = () => {
  // 如果关注 下拉需要请求 like com 请求方法
  if (props.type === 'like') {
    likeComRef.value?.getFollowDoctorData()
  }
  // 下拉刷新 页面重置为1
  currentPage.value = 1
  // 调用请求列表数据方法
  getHomeList('refresh')
}
// 触底加载数据
const onLoad = () => {
  getHomeList()
}
// 获取首页列表数据
const getHomeList = async (type?: string) => {
  const params = {
    current: currentPage.value,
    pageSize: pageSize.value,
    type: props.type
  }
  const data = await getHomeListData(params)
  if (type == 'refresh') {
    homeListData.value = []
  }
  homeListData.value.push(...data.data.rows)
  // 判断是否加载完毕
  if (currentPage.value >= data.data.pageTotal) {
    finished.value = true
  } else {
    currentPage.value++
  }
  // 是否加载完毕
  loading.value = false
  // 下拉刷新完毕
  refreshing.value = false
}
</script>

<template>
  <div class="home-list-com">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!--关注医生-->
        <like-com ref="likeComRef" v-if="props.type === 'like'"></like-com>
        <!-- 列表区域 -->
        <div class="home-list-content">
          <list-item
            v-for="(item, index) in homeListData"
            :key="index"
            :item="item"
          ></list-item>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss"></style>
