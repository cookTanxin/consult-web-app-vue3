<template>
  <div class="c-nav-bar">
    <van-nav-bar
      :title="title"
      :left-arrow="leftArrow"
      fixed
      :border="border"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
  </div>
</template>

<script setup lang="ts" name="CnavBar">
// vue-router
import { useRouter } from 'vue-router'
// 组件类型别名 （泛型别名）
type Props = {
  title?: string
  rightText?: string
  border?: boolean
  leftArrow?: boolean
}
// 定义一个事件类型 emits
interface Emits {
  (e: 'leftClick'): void
  (e: 'rightClick'): void
}

// 自定义事件 给泛型参数传参
const emit = defineEmits<Emits>()
// 自定义参数 给泛型参数传参
withDefaults(defineProps<Props>(), {
  leftArrow: true
})
// router
const router = useRouter()

// 点击左侧箭头跳转
const onClickLeft = () => {
  if (history.state?.back) {
    router.back()
  } else {
    router.push({
      path: '/'
    })
  }
  emit('leftClick')
}
// 点击右侧事件
const onClickRight = () => {
  emit('rightClick')
}
</script>

<style scoped lang="scss">
.c-nav-bar {
  height: 50px;
  :deep() {
    .van-nav-bar {
      &__arrow {
        font-size: 18px;
        color: var(--cp-text1);
      }
      &__text {
        font-size: 15px;
      }
    }
  }
}
</style>
