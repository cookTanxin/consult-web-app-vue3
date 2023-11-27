<template>
  <div class="c-icon">
    <svg class="c-icon-svg" aria-hidden="true">
      <use :href="`#icon-${iconname}`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
type Props = {
  // 图标名称
  iconname: string
  // 图标大小
  size?: number
}
// 自定义参数 给泛型参数传参
withDefaults(defineProps<Props>(), {
  size: 15
})
</script>

<style lang="scss">
.c-icon-svg {
  width: 1em;
  height: 1em;
}
</style>
