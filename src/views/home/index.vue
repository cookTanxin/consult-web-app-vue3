<script setup lang="ts" name="home"></script>

<template>
  <div class="home-page">
    <!--顶部搜索区域-->
    <div class="home-top-search">
      <!--渐变盒子区域-->
      <div class="home-top-bg-box"></div>
      <!--app 名称-->
      <div class="home-page-app-name">庸医</div>
      <!--搜索输入框-->
      <div class="home-top-search">
        <c-icon iconname="home-search"></c-icon>
        <p class="placeholder-text">搜一搜：疾病/症状/医生/健康知识</p>
      </div>
    </div>
    <!--首页导航区域-->
    <div class="home-page-nav"></div>
    <!--首页轮播图-->
    <div class="home-page-swiper"></div>
  </div>
</template>

<style scoped lang="scss"></style>
