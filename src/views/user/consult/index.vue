<script setup lang="ts" name="consult">
// 默认选中
import { ref } from 'vue'
// 列表数据组件
import ConsultList from './component/ConsultList.vue'
import { ConsultType } from '@/enums'
// 默认选中
const tabActive = ref(1)

// 切换tab
const clickTab = (e: { name: number }) => {
  tabActive.value = e.name
}
</script>

<template>
  <div class="consult-page">
    <!-- 自定义导航组件 -->
    <c-nav-bar :leftArrow="true" title="我的档案" border></c-nav-bar>
    <!--顶部菜单-->
    <van-tabs
      v-model:active="tabActive"
      color="#16C2A3"
      :line-width="20"
      @click-tab="clickTab"
      sticky
    >
      <van-tab title="找医生">
        <consult-list :type="ConsultType.Doctor"></consult-list>
      </van-tab>
      <van-tab title="极速问诊">
        <consult-list :type="ConsultType.Fast"></consult-list>
      </van-tab>
      <van-tab title="开药问诊">
        <consult-list :type="ConsultType.Medication"></consult-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.consult-page {
  background-color: #f5f5f5;
  min-height: calc(100vh);
}
</style>
