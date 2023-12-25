<template>
  <div class="room-page">
    <!-- 自定义导航 -->
    <c-nav-bar :leftArrow="true" title="问诊室" border></c-nav-bar>
    <div class="inner-room">
      <!-- 问诊状态 -->
      <div class="cosult-state">
        <room-state
          :status="orderDetailInfo.status"
          :countdown="orderDetailInfo.countdown"
        ></room-state>
      </div>
      <div class="consult-room-message">
        <!-- 问诊消息数据 -->
        <roommessage
          v-for="(item, index) in messageList"
          :item="item"
          :key="index"
        ></roommessage>
      </div>
      <div class="consult-room-bottom">
        <!-- 底部操作 -->
        <operatorform
          :status="orderDetailInfo.status"
          @send-text="userSendMessage"
          @send-img="userUploadImg"
        ></operatorform>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
// socket
import io, { Socket } from 'socket.io-client'
// route
import { useRoute } from 'vue-router'
// store
import { useUserStore } from '@/stores'
// config
import { baseURL } from '@/config'
// 问诊状态
import RoomState from '@/views/room/component/RoomState/index.vue'
// 底部操作
import operatorform from './component/operatorform/index.vue'
// 问诊消息
import roommessage from './component/roommessage/index.vue'
import type { ConsultOrderItem, Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enums'
import { getOrderDetail } from '@/services/consult'
import type { Image } from '@/types/consult'
// store
const userStore = useUserStore()
// 订单详情数据
const orderDetailInfo = ref<ConsultOrderItem>({})
// route
const route = useRoute()
// 问诊消息数据
const messageList = ref<Message[]>([])
// socket
let socket: Socket
// 创建链接
const connectSocket = () => {
  socket = io(baseURL, {
    auth: {
      token: 'Bearer ' + userStore.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })
  // 监听是否链接成功
  socket.on('connect', () => {
    console.log('链接成功')
  })
  // 监听是否断开链接
  socket.on('disconnect', () => {
    console.log('断开链接了')
  })
  // 发生错误
  socket.on('error', (err: any) => {
    console.log('链接发生错误')
    console.log(err)
  })
  // 获取默认聊天记录
  socket.on('chatMsgList', ({ data }) => {
    console.log(data)
    let arr: Message[] = []
    data.forEach((item: TimeMessages) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime
        },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    // 聊天数据
    messageList.value.unshift(...arr)
  })
  // 监听问诊状态的改变 列入医生接单以后 更新详情
  socket.on('statusChange', () => {
    // 刷新订单 获取订单状态值
    getOrderDetailData()
  })
  // 聊天-接收对话信息
  socket.on('receiveChatMsg', async (msg) => {
    messageList.value.push(msg)
    await nextTick()
    // 每次接收到消息 消息直接置底
    window.scroll(0, document.body.scrollHeight)
  })
}

// 用户发送信息
const userSendMessage = (text: string) => {
  socket.emit('sendChatMsg', {
    // 发送人id
    from: userStore.user?.id,
    // 接收人id
    to: orderDetailInfo.value.docInfo.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}

// 用户上传图片
const userUploadImg = (img: Image) => {
  socket.emit('sendChatMsg', {
    // 发送人id
    from: userStore.user?.id,
    // 接收人id
    to: orderDetailInfo.value.docInfo.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: img
    }
  })
}

// 获取订单详情 查询订单详情信息
const getOrderDetailData = async () => {
  const data = await getOrderDetail(route.query.orderId as string)
  orderDetailInfo.value = data.data
}
// 如果用户支付成功 链接socket
onMounted(() => {
  // 查询订单详情
  getOrderDetailData()
  // 链接问诊室
  connectSocket()
})
// 组件销毁
onUnmounted(() => {
  // 当组件销毁时断开链接
  socket.close()
})
</script>

<style scoped lang="scss">
.room-page {
  background-color: #f5f5f5;
  .consult-room-message {
    padding-bottom: 60px;
  }
}
</style>
