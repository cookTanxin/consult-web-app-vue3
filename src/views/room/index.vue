<template>
  <div class="room-page">
    <!-- 自定义导航 -->
    <c-nav-bar :leftArrow="true" title="问诊室" border></c-nav-bar>
    <!-- 问诊状态 -->
    <roomstate></roomstate>
    <!-- 问诊消息数据 -->
    <roommessage></roommessage>
    <!-- 底部操作 -->
    <operatorform></operatorform>
  </div>
</template>

<script setup lang="ts">
// 问诊状态
import roomstate from './component/roomstate/index.vue'
// 底部操作
import operatorform from './component/operatorform/index.vue'
// 问诊消息
import roommessage from './component/roommessage/index.vue'
</script>

<style scoped lang="scss">
.room-page {
  background-color: #f5f5f5;
}
</style>
