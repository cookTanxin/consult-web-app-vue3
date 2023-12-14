<script setup lang="ts" name="CRadio">
type RadioItem = {
  name: string
  value: number
}
type Props = {
  modelValue?: number | string
  listdata: RadioItem[]
}
type Emits = {
  (e: 'update:modelValue', value: number): void
}
// 属性
defineProps<Props>()
// 方法
const emit = defineEmits<Emits>()

// 选中元素
const selectRadio = (item: RadioItem) => {
  emit('update:modelValue', item.value)
}
</script>

<template>
  <div class="c-radio-container">
    <div
      class="c-radio-item"
      v-for="(item, index) in listdata"
      @click="selectRadio(item)"
      :key="index"
      :class="modelValue == item.value ? 'active' : ''"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.c-radio-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .c-radio-item {
    margin-bottom: 10px;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    padding: 4px 15px;
    margin-right: 10px;
    border-radius: 5px;
    &.active {
      color: var(--cp-primary);
      border-color: var(--cp-primary);
    }
  }
}
</style>
