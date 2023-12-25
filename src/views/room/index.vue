<template>
  <div class="room-page">
    <!-- 自定义导航 -->
    <c-nav-bar :leftArrow="true" title="问诊室" border></c-nav-bar>
    <div class="inner-room">
      <!-- 问诊状态 -->
      <div class="cosult-state">
        <room-state></room-state>
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
        <operatorform></operatorform>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { onMounted, onUnmounted, ref } from 'vue'
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
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '@/enums'
// store
const userStore = useUserStore()
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
}
// 如果用户支付成功 链接socket
onMounted(() => {
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
  height: 100vh;
}
</style>
