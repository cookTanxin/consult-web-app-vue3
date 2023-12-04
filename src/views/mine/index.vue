<template>
  <div class="mine-page layout-container">
    <div class="mine-inner-container">
      <div class="mine-inner-content-top">
        <!--用户头像区域-->
        <div class="mine-page-user-account">
          <!--头像-->
          <div class="mine-user-avatar">
            <van-image round fit="cover" :src="userInfo?.avatar" />
          </div>
          <!--用户名称-->
          <div class="mine-user-info">
            <div class="mine-user-username">{{ userInfo?.account || 0 }}</div>
            <van-icon name="edit" color="#2fc8ac" />
          </div>
        </div>
        <!--收藏关注积分优惠卷-->
        <div class="mine-user-property">
          <van-row>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">
                  {{ userInfo?.collectionNumber || 0 }}
                </span>
                <span class="user-property-name">收藏</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">
                  {{ userInfo?.likeNumber || 0 }}
                </span>
                <span class="user-property-name">关注</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">
                  {{ userInfo?.score || 0 }}
                </span>
                <span class="user-property-name">积分</span>
              </div>
            </van-col>
            <van-col span="6">
              <div class="mine-user-property-item">
                <span class="user-property-number">
                  {{ userInfo?.couponNumber || 0 }}
                </span>
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
            <van-icon name="arrow" />
          </div>
        </div>
        <!--订单图标区域-->
        <van-row class="order-icon-area">
          <van-col span="6">
            <van-badge :content="userInfo?.orderInfo.paidNumber || ''">
              <div class="order-item-icon">
                <c-icon iconname="user-paid"></c-icon>
                <p>待付款</p>
              </div>
            </van-badge>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo?.orderInfo.receivedNumber || ''">
              <div class="order-item-icon">
                <c-icon iconname="user-shipped"></c-icon>
                <p>待发货</p>
              </div>
            </van-badge>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo?.orderInfo.shippedNumber || ''">
              <div class="order-item-icon">
                <c-icon iconname="user-received"></c-icon>
                <p>待收货</p>
              </div>
            </van-badge>
          </van-col>
          <van-col span="6">
            <van-badge :content="userInfo?.orderInfo.finishedNumber || ''">
              <div class="order-item-icon">
                <c-icon iconname="user-finished"></c-icon>
                <p>已完成</p>
              </div>
            </van-badge>
          </van-col>
        </van-row>
      </div>
      <!--底部列表区域-->
      <div class="order-tool-list mine-item">
        <div class="mine-item-title">
          <div class="mine-item-title-left">快捷工具</div>
        </div>
        <!--列表区域-->
        <div class="order-tool-list-container">
          <van-cell-group :border="false">
            <van-cell
              v-for="(item, index) in toolUrlList"
              :key="index"
              :title="item.label"
              is-link
              :border="false"
              @click="goUrl(item)"
            >
              <template #icon>
                <c-icon :iconname="`user-tool-0${index + 1}`"></c-icon>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
      <!--退出登录区域-->
      <div class="login-out-area" @click="logout">
        <p>退出登录</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="mine">
// 快捷链接字段数据
import { toolUrlList } from '@/config'
// api
import { getUserInfo } from '@/services/user'
// vant
import { showDialog, showToast } from 'vant'
// store
import { useUserStore } from '@/stores'
// vue-router
import { useRouter } from 'vue-router'
// vue
import { onMounted, ref } from 'vue'
// 类型
import type { UserinfoData } from '@/types/user'
// store
const userStore = useUserStore()
// router
const router = useRouter()
// 用户数据
const userInfo = ref<UserinfoData>()
// 用户退出登录
const logout = () => {
  // 询问客户是否退出
  showDialog({
    title: '温馨提示',
    message: '确认退出登录吗？',
    showCancelButton: true
  })
    .then(() => {
      // 清空用户数据
      userStore.delUser()
      // 跳转到登录页面
      router.push('/login').then(() => {
        showToast('退出成功！')
      })
    })
    .catch(() => {
      showToast('已取消')
    })
}
// 跳转链接
const goUrl = (item: any) => {
  router.push({
    path: item.path
  })
}

// 获取用户信息数据
const getUserInfoData = async () => {
  const data = await getUserInfo()
  userInfo.value = data.data
}

// 页面挂载
onMounted(() => {
  // 获取用户数据
  getUserInfoData()
})
</script>

<style scoped lang="scss">
.mine-page {
  padding: 0 0px 65px;
  background-color: #f6f7f9;
  //100vh - 50 tabbar 高度
  min-height: calc(100vh - 50px);
  .mine-inner-container {
    .mine-item {
      background-color: #fff;
      border-radius: 8px;
      padding: 14px;
      box-sizing: border-box;
      .mine-item-title {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        .mine-item-title-left {
          font-size: 16px;
          font-weight: bold;
        }
        .mine-item-title-right {
          color: #c8c8ca;
        }
      }
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
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
        .mine-user-info {
          margin-left: 10px;
          .mine-user-username {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .van-icon {
            font-size: 15px;
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
  .medicine-order {
    margin-left: 16px;
    margin-right: 16px;
    .order-icon-area {
      margin-top: 20px;
      .van-col {
        text-align: center;
      }
    }
    .order-item-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-top: 6px;
        font-size: 12px;
      }
      .c-icon {
        font-size: 30px;
      }
    }
  }
  .order-tool-list {
    margin-top: 20px;
    margin-left: 16px;
    margin-right: 16px;
    .order-tool-list-container {
      margin-top: 15px;
      .c-icon {
        font-size: 22px;
        margin-right: 8px;
      }
    }
  }
  .login-out-area {
    margin-top: 20px;
    text-align: center;
    width: 100%;
    color: var(--cp-warning);
  }
}
</style>
