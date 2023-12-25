<script setup lang="ts">
import { OrderType } from '@/enums'
import { ref } from 'vue'
import { showToast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import { uploadFile } from '@/services/public'
import type { Image } from '@/types/consult'
// 用户输入信息
const userInputText = ref('')
// 组件参数
type Props = {
  status?: string | number
}
defineProps<Props>()
// 组件自定义事件
type Emits = {
  (e: 'sendText', text: string): void
  (e: 'sendImg', img: Image): void
}
const emits = defineEmits<Emits>()
// 发送文字消息
const sendMessage = () => {
  if (!userInputText.value) {
    showToast('请输入信息！')
    return
  }
  emits('sendText', userInputText.value)
  // 清空数据
  userInputText.value = ''
}
// 上传图片完成以后事件
const onAfterRead: UploaderAfterRead = async (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  item.status = 'uploading'
  item.message = '上传中'
  const imgData = await uploadFile(item.file)
  emits('sendImg', imgData.data)
}
// 限制图片上传大小
const onOversize = () => {
  showToast('图片太大了,缩小图片哦！')
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      v-model="userInputText"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="sendMessage"
      :disabled="status != OrderType.ConsultChat"
    ></van-field>
    <van-uploader
      :preview-image="false"
      :max-size="2 * 1024 * 1024"
      @oversize="onOversize"
      :after-read="onAfterRead"
      :disabled="status != OrderType.ConsultChat"
    >
      <c-icon iconname="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .c-icon {
    font-size: 24px;
  }
}
</style>
