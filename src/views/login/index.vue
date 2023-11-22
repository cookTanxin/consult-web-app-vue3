<template>
  <div class="login-container">
    <!-- 自定义导航组件 -->
    <c-nav-bar
      @rightClick="barRightclick"
      right-text="注册"
      title="登录"
    ></c-nav-bar>
  </div>
</template>

<script setup lang="ts" name="Login">
const barRightclick = () => console.log('555')
</script>

<style scoped lang="scss"></style>
