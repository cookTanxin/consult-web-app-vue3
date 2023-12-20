<template>
  <div class="consult-fast-page">
    <!-- 自定义导航 -->
    <c-nav-bar
      :leftArrow="true"
      @rightClick="barRightclick"
      right-text="查询问诊记录"
      title="急速问诊"
      border
    ></c-nav-bar>
    <!-- 急速问诊内容区域 -->
    <div class="consult-fast-content">
      <div class="consult-fast-img">
        <img src="../../../assets//consult-fast.png" alt="急速问诊" />
      </div>
      <div class="consult-fast-desc">
        <span class="consult-fast-time">20s</span>
        <span class="consult-fast-text">快速匹配专业医生</span>
      </div>
    </div>
    <!-- 急速问诊选项 -->
    <div class="consult-fast-select-list">
      <div class="consult-fast-select-item" @click="goPage(1)">
        <div class="consult-fast-select-left">
          <c-icon iconname="consult-doctor"></c-icon>
          <div class="consult-fast-select-left-text">
            <h3>三甲图文问诊</h3>
            <span>三甲主治及以上级别医生</span>
          </div>
        </div>
        <div class="consult-fast-select-right">
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
      <div class="consult-fast-select-item" @click="goPage(0)">
        <div class="consult-fast-select-left">
          <c-icon iconname="consult-message"></c-icon>
          <div class="consult-fast-select-left-text">
            <h3>普通图文问诊</h3>
            <span>三甲主治及以上级别医生</span>
          </div>
        </div>
        <div class="consult-fast-select-right">
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="consultFast">
// 路由
import { useRouter } from 'vue-router'
// consult Store
import { useConsult } from '@/stores'
// router
const router = useRouter()
// store
const useStore = useConsult()
// 查询问诊记录
const barRightclick = () => {
  console.log('查询问诊记录')
}
// 跳转页面
const goPage = (type: 0 | 1) => {
  router.push({
    path: '/consult/dep'
  })
  // 设置全局参数
  useStore.setillnessType(type)
}
</script>

<style scoped lang="scss">
.consult-fast-page {
  width: 100%;
  .consult-fast-content {
    img {
      width: 300px;
      display: block;
      margin: 0 auto;
      margin-top: 40px;
    }
    .consult-fast-desc {
      text-align: center;
      font-size: 16px;
      .consult-fast-time {
        color: var(--cp-primary);
        font-weight: bold;
      }
    }
  }
  .consult-fast-select-list {
    padding: 16px;
    .consult-fast-select-item {
      border: 1px solid #f5f5f5;
      border-radius: 5px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding: 16px;
      box-sizing: border-box;
      justify-content: space-between;
      .consult-fast-select-left {
        display: flex;
        .c-icon {
          font-size: 40px;
        }
        .consult-fast-select-left-text {
          margin-left: 13px;
          h3 {
            font-weight: bold;
            font-size: 16px;
          }
          span {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .consult-fast-select-right {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
