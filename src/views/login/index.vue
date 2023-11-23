<template>
  <div class="login-container">
    <!-- 自定义导航组件 -->
    <c-nav-bar
      @rightClick="barRightclick"
      right-text="注册"
      title="登录"
      :border="false"
    ></c-nav-bar>
    <!-- 登录区域 -->
    <div class="login-form-area">
      <div class="login-form-area-head">
        <h3 class="login-form-area-head-title">密码登录</h3>
        <div class="login-form-area-head-method">
          <span>手机验证码登录</span>
          <van-icon name="arrow" color="#515256" />
        </div>
      </div>
      <!-- 登录表单区域 -->
      <div class="login-form-content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="formData.mobile"
            type="tel"
            :rules="mobileRule"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="formData.password"
            type="password"
            :rules="passwordRule"
            placeholder="请输入密码"
          />
          <!-- 隐私协议 -->
          <div class="user-agreement">
            <van-checkbox icon-size="16" v-model="formData.useragreement">
              <div class="user-agreement-content">
                <span class="cp-text-black">我已同意</span>
                <span class="cp-text-green">用户协议</span>
                <span class="cp-text-black">及</span>
                <span class="cp-text-green">隐私协议</span>
              </div>
            </van-checkbox>
          </div>
          <!-- 登录按钮 -->
          <div class="login-submit-button">
            <van-button
              round
              block
              type="primary"
              native-type="submit"
              :loading="loginLoading"
              loading-text="登录中..."
            >
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
// vue
import { ref } from 'vue'
// 导入表单验证规则
import { mobileRule, passwordRule } from '@/utils/rules'
// vant
import { showToast, showSuccessToast } from 'vant'
// api
import { loginPassword } from '@/services/public'
// store
import { useUserStore } from '@/stores'
// 登录按钮是否加载
const loginLoading = ref(false)
// store
const usersStore = useUserStore()
// vue router
import { useRoute, useRouter } from 'vue-router'
// route
const route = useRoute()
// router
const router = useRouter()
// 表单提交项目
const formData = ref({
  // 手机号
  mobile: '13230000001',
  // 密码
  password: 'abc12345',
  // 用户协议
  useragreement: false
})
// 表单提交
const onSubmit = async () => {
  // 判断是否选择了用户协议
  if (!formData.value.useragreement) {
    showToast('请勾选用户协议')
    return
  }
  // 登录按钮加载
  loginLoading.value = true
  // 提交表单
  try {
    let data = await loginPassword(
      formData.value.mobile,
      formData.value.password
    )
    // 存储用户信息
    usersStore.setUser(data.data)
    // 按钮loading 加载
    loginLoading.value = false
    // 登录成功提示
    showSuccessToast('登录成功！')
    // 判断是否需要回调url
    if (route.query.returnUrl) {
      router.replace(route.query.returnUrl as string)
    } else {
      router.replace('/')
    }
  } catch (err) {
    loginLoading.value = false
  }
}
// 点击注册
const barRightclick = () => {
  console.log('注册')
}
</script>

<style scoped lang="scss">
.login-container {
  .login-form-area {
    .login-form-area-head {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: 41px;
      margin-bottom: 41px;
      .login-form-area-head-title {
        font-size: 23px;
        font-weight: normal;
        color: #333;
        margin-left: 15px;
      }
      .login-form-area-head-method {
        font-size: 15px;
        color: #515256;
        margin-right: 15px;
      }
    }
    .login-form-content {
      :deep() {
        .van-form {
          .van-cell {
            margin-bottom: 14px;
          }
        }
      }
      .user-agreement {
        margin-left: 15px;
        margin-top: 17px;
        .user-agreement-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          span {
            margin: 0 2px;
          }
        }
      }
      .login-submit-button {
        margin-top: 30px;
        padding: 0 15px;
        box-sizing: border-box;
        :deep() {
          .van-button__content {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
