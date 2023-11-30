<script setup lang="ts">
import type { Doctor } from '@/types/home'
type Props = {
  doctorItem: Doctor
}
defineProps<Props>()
</script>
<template>
  <div class="doctor-item">
    <!--医生头像-->
    <div class="doctor-avatar">
      <img :src="doctorItem.avatar" alt="" />
    </div>
    <!--医生名称-->
    <div class="doctor-name">{{ doctorItem.name }}</div>
    <!--医生简介-->
    <div class="doctor-desc van-multi-ellipsis--l2">
      {{ doctorItem.hospitalName }}
    </div>
    <!--关注按钮-->
    <div class="doctor-button">
      <van-button round size="small" type="primary">+ 关注</van-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.doctor-item {
  width: 134px;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .doctor-avatar {
    width: 58px;
    height: 58px;
    background-color: #f5f5f5;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .doctor-name {
    margin: 14px 0 10px 0;
    font-weight: bold;
  }
  .doctor-desc {
    width: 100%;
    font-size: 12px;
    color: #999;
    text-align: center;
  }
  .doctor-button {
    margin-top: 10px;
  }
}
</style>
