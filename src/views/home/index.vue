<script setup lang="ts" name="home"></script>

<template>
  <div class="home-page">
    <!--顶部搜索区域-->
    <div class="home-top-search">
      <!--渐变盒子区域-->
      <div class="home-top-bg-box"></div>
      <!--顶部内容区域-->
      <div class="home-top-content">
        <!--app 名称-->
        <div class="home-page-app-name">庸医问诊</div>
        <!--搜索输入框-->
        <div class="home-top-search-box">
          <c-icon iconname="home-search"></c-icon>
          <p class="placeholder-text">搜一搜：疾病/症状/医生/健康知识</p>
        </div>
      </div>
    </div>
    <!--首页导航区域-->
    <div class="home-page-nav">
      <!--顶部大图标-->
      <div class="nav-primary">
        <van-row>
          <van-col span="8">
            <router-link to="/">
              <c-icon iconname="home-doctor"></c-icon>
              <p class="title">问医生</p>
              <p class="desc">按科室查问医生</p>
            </router-link>
          </van-col>
          <van-col span="8">
            <router-link to="/">
              <c-icon iconname="home-graphic"></c-icon>
              <p class="title">极速问诊</p>
              <p class="desc">20s医生极速回复</p>
            </router-link>
          </van-col>
          <van-col span="8">
            <router-link to="/">
              <c-icon iconname="home-prescribe"></c-icon>
              <p class="title">开药门诊</p>
              <p class="desc">线上买药更方便</p>
            </router-link>
          </van-col>
        </van-row>
      </div>
      <!--顶部小图标-->
      <div class="nav-small">
        <van-row>
          <van-col span="6">
            <router-link to="/">
              <c-icon iconname="home-order"></c-icon>
              <p class="title">开药门诊</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/">
              <c-icon iconname="home-docs"></c-icon>
              <p class="title">健康档案</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/">
              <c-icon iconname="home-rp"></c-icon>
              <p class="title">我的处方</p>
            </router-link>
          </van-col>
          <van-col span="6">
            <router-link to="/">
              <c-icon iconname="home-find"></c-icon>
              <p class="title">疾病查询</p>
            </router-link>
          </van-col>
        </van-row>
      </div>
    </div>
    <!--首页轮播图-->
    <div class="home-page-swiper">
      <van-swipe class="home-swiper" :autoplay="2000" indicator-color="white">
        <van-swipe-item>
          <img class="home-swiper-img" src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img class="home-swiper-img" src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img class="home-swiper-img" src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img class="home-swiper-img" src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--底部新闻列表-->
    <div class="home-content-list">底部新闻列表</div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  .home-top-search {
    width: 100%;
    position: relative;
    height: 116px;
    .home-top-content {
      z-index: 9;
      height: 100%;
      position: absolute;
      width: 100%;
      padding: 0 14px;
      box-sizing: border-box;
    }
    .home-top-bg-box {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      width: 100%;
      height: 88px;
      border-radius: 0 0 20px 20px;
      background: linear-gradient(to bottom, #72dbd5, #36c3c8);
    }
    .home-page-app-name {
      color: #fff;
      font-size: 18px;
      margin-top: 25px;
      margin-left: 8px;
    }
    .home-top-search-box {
      width: 100%;
      height: 43px;
      background-color: #fff;
      border-radius: 80px;
      padding: 10px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: #9c9c9c;
      margin-top: 15px;
      box-shadow: 0 15px 22px -7px rgba(224, 236, 250, 0.8);
      .c-icon {
        font-size: 18px;
      }
      .placeholder-text {
        margin-left: 5px;
      }
    }
  }
  .home-page-nav {
    .nav-primary {
      margin-top: 16px;
      .van-col {
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .c-icon {
            font-size: 40px;
          }
          .title {
            font-size: 14px;
            font-weight: 500;
          }
          .desc {
            font-size: 12px;
            color: var(--cp-tag);
            margin-top: 4px;
          }
        }
      }
    }
    .nav-small {
      margin-top: 20px;
      margin-left: 14px;
      margin-right: 14px;
      .van-col {
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 13px;
          }
        }
        .c-icon {
          font-size: 30px;
        }
      }
    }
  }
  .home-page-swiper {
    margin-top: 20px;
    .home-swiper {
      .home-swiper-img {
        display: block;
        margin: 0 auto;
        height: 98px;
      }
    }
  }
}
</style>
