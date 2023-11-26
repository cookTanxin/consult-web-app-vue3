<script setup lang="ts" name="mine"></script>

<template>
  <div class="mine-page layout-container">
    <div class="mine-inner-container">
      <div class="mine-inner-content-top">
        <!--用户头像区域-->
        <div class="mine-page-user-account">
          <!--头像-->
          <div class="mine-user-avatar">
            <van-image
              width="70"
              height="70"
              round
              fit="cover"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </div>
          <!--用户名称-->
          <div class="mine-user-info">
            <div class="mine-user-username">张三</div>
            <van-icon name="edit" size="18" color="#2fc8ac" />
          </div>
        </div>
        <!--收藏关注积分优惠卷-->
        <div class="mine-user-property">
          <van-row>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">15</span>
                <span class="user-property-name">收藏</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">15</span>
                <span class="user-property-name">关注</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">15</span>
                <span class="user-property-name">积分</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">15</span>
                <span class="user-property-name">优惠卷</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!--药品订单-->
      <div class="medicine-order mine-item">
        <div class="mine-item-title">
          <div class="mine-item-title-left">药品订单</div>
          <div class="mine-item-title-right">
            <span>全部订单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mine-page {
  background-color: #f6f7f9;
  .mine-inner-container {
    .mine-item {
      background-color: #fff;
      border-radius: 5px;
      margin-left: 16px;
      margin-right: 16px;
      padding: 14px;
      box-sizing: border-box;
    }
    .mine-inner-content-top {
      padding: 49px 16px 16px 16px;
      background: linear-gradient(
        180deg,
        rgba(44, 181, 165, 0.46),
        rgba(44, 181, 165, 0)
      );
      .mine-page-user-account {
        display: flex;
        align-items: center;
        .mine-user-avatar {
          width: 70px;
          height: 70px;
        }
        .mine-user-info {
          margin-left: 10px;
          .mine-user-username {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
        }
      }
      .mine-user-property {
        margin-top: 16px;
        .mine-user-property-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .user-property-number {
          font-size: 19px;
        }
        .user-property-name {
          font-size: 12px;
          color: #9e9e9e;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
