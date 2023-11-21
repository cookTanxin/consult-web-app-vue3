<script setup lang="ts">
import { useUserStore } from './stores'
import request from './utils/request'
const store = useUserStore()
const setuserinfo = () => {
  const user = {
    // 令牌
    token: 'string',
    // 刷新token
    refreshToken: 'string',
    // 头像
    avatar: 'string',
    // 脱敏手机号，带星号的手机号
    mobile: 'string',
    // 用户名
    account: 'string',
    // 用户id
    id: 'sfh'
  }
  store.setUser(user)
  request('/login', 'post', { mobile: 18581569814, code: 123456 })
}
</script>
<template>
  <div>{{ store.user }}</div>
  <button @click="setuserinfo">设置</button>
  <button @click="store.delUser">删除</button>
</template>
