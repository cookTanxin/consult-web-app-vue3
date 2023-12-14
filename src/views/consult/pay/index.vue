<template>
  <div class="consult-pay">
    <!-- 自定义导航 -->
    <c-nav-bar :leftArrow="true" title="支付费用" border></c-nav-bar>
    <!-- 支付费用内容区域 -->
    <div class="consult-pay-content">
      <div class="consult-pay-content-top">
        <div class="consult-pay-type">图文问诊30元</div>
        <div class="consult-pay-doctor-avatar">
          <img src="../../../assets//avatar-doctor.svg" alt="doctorimg" />
          <div class="doctor-info-text">
            <p>极速问诊</p>
            <p>自动分配医生</p>
          </div>
        </div>
      </div>
      <!-- 价格明细 -->
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
      <!-- 色块分割 -->
      <div class="pay-space"></div>
      <!-- 患者信息 -->
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
      <!-- 支付协议 -->
      <div class="pay-agreement">
        <van-checkbox>我已同意</van-checkbox>
        <span>支付协议</span>
      </div>
      <!-- 支付区域 -->
      <van-submit-bar text-align="left" :price="3050" button-text="立即支付" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
