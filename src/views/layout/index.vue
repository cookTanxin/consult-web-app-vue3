<script setup lang="ts" name="layout">
// 切换路由 页面回到顶部
const changeTab = () => {
  window.scrollTo(0, 0)
}
</script>

<template>
  <div class="layout-page">
    <!--主布局子页面-->
    <router-view></router-view>
    <!--page-tab components -->
    <van-tabbar route @change="changeTab">
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="props">
          <c-icon
            :iconname="`${
              props.active ? 'home-index-active' : 'home-index-default'
            }`"
          ></c-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/health">
        <span>健康百科</span>
        <template #icon="props">
          <c-icon
            :iconname="`${
              props.active ? 'home-article-active' : 'home-article-default'
            }`"
          ></c-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/message">
        <span>消息</span>
        <template #icon="props">
          <c-icon
            :iconname="`${
              props.active ? 'home-notice-active' : 'home-notice-default'
            }`"
          ></c-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <span>我的</span>
        <template #icon="props">
          <c-icon
            :iconname="`${
              props.active ? 'home-mine-active' : 'home-mine-default'
            }`"
          ></c-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="scss">
.layout-page {
  .van-tabbar-item {
    &__icon {
      font-size: 21px;
    }
    &__text {
      font-size: 11px;
    }
    &:not(.van-tabbar-item--active) {
      color: var(--cp-text3);
    }
  }
}
</style>
