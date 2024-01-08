<script setup lang="ts">
import type { OrderConsultItem } from '@/types/user'
import { OrderType } from '@/enums'
import { useOrderCancel } from '@/composables/useOrderCancel'
import { useOrderDelete } from '@/composables/useOrderDelete'
interface Props {
  item: OrderConsultItem
}
interface Emits {
  (e: 'deleteRefresh', itemdata: OrderConsultItem): void
}
const props = defineProps<Props>()
// 自定义事件
const emits = defineEmits<Emits>()
const { loading: cancelLoading, orderCancel } = useOrderCancel()
const { loading: deleteLoading, onDeleteOrder } = useOrderDelete(() => {
  emits('deleteRefresh', props.item)
})
</script>

<template>
  <div class="consult-order-item-content">
    <!--top area-->
    <div class="consult-order-item-head">
      <div class="consult-order-item-head-left">
        <img src="../../../../assets/avatar-doctor.svg" alt="doctor-img" />
      </div>
      <div class="consult-order-item-head-right">
        <span>{{ item.statusValue }}</span>
      </div>
    </div>
    <!--body area-->
    <div class="consult-order-item-body">
      <ul>
        <li>
          <span>病情描述</span>
          <span>{{ item.illnessDesc }}</span>
        </li>
        <li>
          <span>价格</span>
          <span>¥{{ item.payment }}</span>
        </li>
        <li>
          <span>创建时间</span>
          <span>{{ item.createTime }}</span>
        </li>
      </ul>
    </div>
    <!--footer area-->
    <div class="foot" v-if="item.status === OrderType.ConsultPay">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="cancelLoading"
        @click="orderCancel(item)"
        >取消问诊</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/user/consult/${item.id}`"
      >
        去支付
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultWait">
      <van-button
        class="gray"
        plain
        size="small"
        round
        @click="orderCancel(item)"
        >取消问诊</van-button
      >
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/room?orderId=${item.id}`"
      >
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultChat">
      <van-button
        v-if="item.prescriptionId"
        class="gray"
        plain
        size="small"
        round
      >
        查看处方
      </van-button>
      <van-button
        type="primary"
        plain
        size="small"
        round
        :to="`/room?orderId=${item.id}`"
      >
        继续沟通
      </van-button>
    </div>
    <div class="foot" v-if="item.status === OrderType.ConsultCancel">
      <van-button
        class="gray"
        plain
        size="small"
        round
        :loading="deleteLoading"
        @click="onDeleteOrder(item)"
        >删除订单</van-button
      >
      <van-button type="primary" plain size="small" round to="/"
        >咨询其他医生</van-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.consult-order-item-content {
  background-color: #fff;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  .consult-order-item-head {
    border-bottom: 1px solid #f5f5f5;
    width: 100%;
    padding: 0 0 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .consult-order-item-head-left {
      img {
        display: block;
        width: 40px;
        height: 40px;
      }
    }
    .consult-order-item-head-right {
      span {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .consult-order-item-body {
    ul {
      margin: 10px 0;
      li {
        line-height: 30px;
        display: flex;
        span {
          font-size: 14px;
          color: #999;
          &:first-child {
            color: #333;
            width: 70px;
            display: block;
          }
          &:last-child {
            flex: 1;
          }
        }
      }
    }
  }
  .foot {
    display: flex;
    justify-content: flex-end;
    button {
      margin: 0 5px;
    }
  }
}
</style>
