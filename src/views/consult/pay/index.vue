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
        <van-cell title="优惠券" :value="`-¥${orderpre?.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-¥${orderpre?.pointDeduction}`" />
        <van-cell title="需付款" :value="`-¥${orderpre?.payment}`" />
      </van-cell-group>
      <!-- 色块分割 -->
      <div class="pay-space"></div>
      <!-- 患者信息 -->
      <van-cell-group>
        <van-cell
          title="患者"
          :value="`${patientInfo?.name} | ${patientInfo?.age}岁 | ${
            patientInfo?.gender == 1 ? '男' : '女'
          }`"
        />
        <van-cell title="实付款" value="内容">
          <template #value>
            <div class="pay-price">¥{{ orderpre?.actualPayment }}</div>
          </template>
        </van-cell>
        <van-cell title="病情描述" label="描述信息" />
      </van-cell-group>
      <!-- 支付协议 -->
      <div class="pay-agreement">
        <van-checkbox :icon-size="15" v-model="userAgreement"
          >我已同意</van-checkbox
        >
        <span>支付协议</span>
      </div>
      <!-- 支付区域 -->
      <van-submit-bar
        text-align="left"
        :price="3050"
        button-text="立即支付"
        @click="gopay"
        button-color="#16C2A3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { ref, onMounted } from 'vue'
// vant
import { showToast } from 'vant'
// api
import { queryPatientInfo } from '@/services/patient'
// api
import { getOrderPreData } from '@/services/consult'
// store
import { useConsult } from '@/stores'
// type
import type { Patient } from '@/types/patient'
// type
import type { OrderPre } from '@/types/consult'
// 患者信息数据
const patientInfo = ref<Patient>()
// 预计算数据
const orderpre = ref<OrderPre>()
// store
const useStore = useConsult()
// 用户是否选择协议
const userAgreement = ref(false)
// 获取患者信息
const getPatientinfo = async () => {
  // 类型守卫
  if (!useStore.consultData.patientId) return
  const res = await queryPatientInfo(useStore.consultData.patientId)
  patientInfo.value = res.data
}
// 获取预支付信息
const getOrderpre = async () => {
  const res = await getOrderPreData({
    type: useStore.consultData.type,
    illnessType: useStore.consultData.illnessType
  })
  orderpre.value = res.data
  // 设置优惠卷id
  useStore.setcouponId(res.data.couponId)
}
// 点击支付
const gopay = () => {
  if (!userAgreement.value) {
    showToast('请同意协议')
    return
  }
}
onMounted(() => {
  getPatientinfo()
  getOrderpre()
})
</script>

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
