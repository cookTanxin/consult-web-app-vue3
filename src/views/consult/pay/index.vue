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
        <van-cell title="优惠券" value="-¥0" />
        <van-cell title="积分抵扣" value="-¥0" />
        <van-cell title="实付款" value="¥39" />
      </van-cell-group>
      <!-- 色块分割 -->
      <div class="pay-space"></div>
      <!-- 患者信息 -->
      <van-cell-group>
        <van-cell title="实付款" value="内容">
          <template #value>
            <div class="pay-price">¥39</div>
          </template>
        </van-cell>
        <van-cell title="病情描述" label="描述信息" />
      </van-cell-group>
      <!-- 支付协议 -->
      <div class="pay-agreement">
        <van-checkbox :icon-size="15">我已同意</van-checkbox>
        <span>支付协议</span>
      </div>
      <!-- 支付区域 -->
      <van-submit-bar
        text-align="left"
        :price="3050"
        button-text="立即支付"
        button-color="#16C2A3"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.consult-pay {
  .consult-pay-content {
    .pay-space {
      width: 100%;
      height: 15px;
      background-color: #f5f5f5;
    }
    .pay-agreement {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      span {
        color: var(--cp-primary);
        margin-left: 5px;
      }
    }
    .pay-price {
      color: var(--cp-warning);
      font-size: 16px;
      font-weight: bold;
    }
    .consult-pay-content-top {
      padding: 16px;
      .consult-pay-type {
        font-size: 16px;
        font-weight: bold;
      }
      .consult-pay-doctor-avatar {
        margin-top: 20px;
        display: flex;
        img {
          display: block;
          width: 60px;
          height: 60px;
        }
        .doctor-info-text {
          margin-left: 10px;
          p {
            &:first-child {
              color: var(--cp-primary);
              font-size: 15px;
            }
            &:last-child {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
