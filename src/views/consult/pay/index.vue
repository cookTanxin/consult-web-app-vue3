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
        v-if="orderpre?.actualPayment"
        text-align="left"
        :price="orderpre?.actualPayment * 100"
        button-text="立即支付"
        @click="gopay"
        :loading="payLoading"
        button-color="#16C2A3"
      />
    </div>
    <!-- 支付弹窗 -->
    <van-action-sheet
      v-model:show="showPay"
      title="支付选择"
      @cancel="cancelPay"
      :beforeClose="closePayDialog"
    >
      <div class="pay-type">
        <p class="amount">￥{{ orderpre?.actualPayment }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="payType = 0">
            <template #icon><c-icon iconname="consult-wechat" /></template>
            <template #extra><van-checkbox :checked="payType == 0" /></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="payType = 1">
            <template #icon><c-icon iconname="consult-alipay" /></template>
            <template #extra><van-checkbox :checked="payType == 1" /></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" round block @click="payOrder"
            >立即支付</van-button
          >
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
// vue
import { ref, onMounted } from 'vue'
// vant
import { showToast, showDialog } from 'vant'
// api
import { queryPatientInfo, createOrderId } from '@/services/patient'
// api
import { getOrderPreData, payOrderData } from '@/services/consult'
// store
import { useConsult } from '@/stores'
// type
import type { Patient } from '@/types/patient'
// type
import type { OrderPre, PartialConsult, PayOrderParams } from '@/types/consult'
// router
import { useRouter, onBeforeRouteLeave } from 'vue-router'
// router
const router = useRouter()
// 患者信息数据
const patientInfo = ref<Patient>()
// 预计算数据
const orderpre = ref<OrderPre>()
// store
const useStore = useConsult()
// 是否显示支付弹窗
const showPay = ref(false)
//支付方式
const payType = ref<0 | 1>()
// 用户点击支付生成的订单号
const orderId = ref('')
// 是否正在生成订单
const payLoading = ref<boolean>(false)
// 用户是否选择协议
const userAgreement = ref(false)
// 获取患者信息
const getPatientinfo = async () => {
  // 类型守卫
  if (!useStore.consultData.patientId) return
  const res = await queryPatientInfo(useStore.consultData.patientId)
  patientInfo.value = res.data
}
// 关闭支付弹窗
const cancelPay = () => {
  payType.value = undefined
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
// 关闭支付弹窗之前 调用函数
const closePayDialog = () => {
  showDialog({
    title: '温馨提示',
    message: '确认不支付了?',
    cancelButtonText: '取消',
    showCancelButton: true,
    confirmButtonText: '给钱'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      // 清空阻止的条件 id 要不然 onBeforeRouteleave
      orderId.value = ''
      // 跳转到个人中心
      router.push({
        path: '/mine'
      })
      return true
    })
}
// 点击支付
const gopay = async () => {
  if (!userAgreement.value) {
    showToast('请同意协议')
    return
  }
  payLoading.value = true
  // 生成订单号
  const res = await createOrderId(useStore.consultData)
  // 取消按钮加载
  payLoading.value = false
  // 订单号
  orderId.value = res.data.id
  // 清空全局问诊数据
  useStore.clearConsultFormData()
  // 显示弹窗
  showPay.value = true
}
// 用户点击支付
const payOrder = async () => {
  if (payType.value === undefined) {
    showToast('请选择支付方式!')
    return
  }
  if (payType.value === 0) {
    showToast('暂不支持微信支付!')
    return
  }
  let params: PayOrderParams = {
    orderId: orderId.value,
    paymentMethod: payType.value,
    payCallback: 'http://localhost:5173/room'
  }
  const res = await payOrderData(params)
  console.log(res)
  window.location.href = res.data.payUrl
}
// 判断订单是否生成过订单号
const checkOrderCreateId = () => {
  // 条件问诊数据缺一个字段都不能再次提交了
  type VerifyData = keyof PartialConsult
  const verifyKey: VerifyData[] = [
    'consultFlag',
    'depId',
    'illnessDesc',
    'patientId'
  ]
  const isCreate = verifyKey.every((k) => useStore.consultData[k] !== undefined)
  return isCreate
}

// 路由导航 组件路由守卫
onBeforeRouteLeave(() => {
  // 如果生成了id 就 阻止用户离开
  if (orderId.value) {
    return false
  }
})

onMounted(() => {
  if (checkOrderCreateId()) {
    getPatientinfo()
    getOrderpre()
  } else {
    showDialog({
      title: '温馨提示',
      message: '此订单已经提交过啦!'
    }).then(() => {
      router.push({
        path: '/mine'
      })
    })
  }
})
</script>

<style scoped lang="scss">
.consult-pay {
  .pay-type {
    .amount {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .btn {
      padding: 15px;
    }
    .van-cell {
      align-items: center;
      height: 66px;
      .c-icon {
        margin-right: 10px;
        margin-top: 6px;
        font-size: 18px;
      }
      .van-checkbox :deep(.van-checkbox__icon) {
        font-size: 16px;
      }
    }
  }
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
