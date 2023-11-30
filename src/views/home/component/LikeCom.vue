<script setup lang="ts">
// 关注医生组件
import DoctorItem from './DoctorItem.vue'
// vueUse
import { useWindowSize } from '@vueuse/core'
// 获取动态宽度
const { width } = useWindowSize()
// api
import { followDoctorListData } from '@/services/home'
// vue
import { onMounted, ref } from 'vue'
// 类型
import type { FollowDoctor } from '@/types/home'
// 关注医生列表
const followDoctorList = ref<FollowDoctor>([])
// 获取关注医生列表数据
const getFollowDoctorData = async () => {
  const data = await followDoctorListData({ current: 1, pageSize: 5 })
  followDoctorList.value = data.data.rows
}
// 挂载
onMounted(() => {
  getFollowDoctorData()
})
// 抛出方法和属性
defineExpose({
  getFollowDoctorData
})
</script>

<template>
  <div class="like-com" v-if="followDoctorList.length > 0">
    <div class="like-com-head">
      <div class="like-left">推荐关注</div>
      <div class="like-right">
        <span>查看更多</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!--关注医生列表-->
    <div class="like-doctor-list">
      <van-swipe
        :loop="false"
        :width="(130 / 375) * width"
        :show-indicators="false"
        class="like-swiper"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item
          class="like-swiper-item"
          v-for="(item, index) in followDoctorList"
          :key="index"
        >
          <doctor-item :doctor-item="item"></doctor-item>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style scoped lang="scss">
.like-com {
  width: 100%;
  background-color: #f6f7f9;
  padding: 16px 0;
  .like-com-head {
    padding: 0 14px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .like-left {
      font-size: 14px;
    }
    .like-right {
      color: var(--cp-tag);
      display: flex;
      align-items: center;
    }
  }
  .like-doctor-list {
    margin-top: 18px;
    .like-swiper {
      .like-swiper-item {
        margin-right: 28px;
        &:first-child {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
