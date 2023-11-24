<template>
  <div class="login-container">
    <!-- 自定义导航组件 -->
    <c-nav-bar
      :leftArrow="false"
      @rightClick="barRightclick"
      right-text="注册"
      title="登录"
      :border="false"
    ></c-nav-bar>
    <div class="login-content">
      <!-- 登录区域 -->
      <div class="login-form-area">
        <div class="login-form-area-head">
          <h3 class="login-form-area-head-title">
            {{ isPassword ? '密码登录' : '短信验证码登录' }}
          </h3>
          <div class="login-form-area-head-method" @click="changeLoginType">
            <span>{{ isPassword ? '手机验证码登录' : '密码登录' }}</span>
            <van-icon name="arrow" color="#515256" />
          </div>
        </div>
        <!-- 登录表单区域 -->
        <div class="login-form-content">
          <van-form @submit="onSubmit" ref="vantForm">
            <van-field
              name="mobile"
              v-model="formData.mobile"
              type="tel"
              :rules="mobileRule"
              placeholder="请输入手机号"
            />
            <van-field
              v-if="isPassword"
              v-model="formData.password"
              type="password"
              :rules="passwordRule"
              placeholder="请输入密码"
            />
            <van-field
              v-else
              v-model="formData.code"
              placeholder="请输入验证码"
            >
              <template #button>
                <span
                  @click="sendMessageCode"
                  :class="countDownNum > 0 ? 'countdownActive' : ''"
                >
                  {{
                    countDownNum > 0 ? `${countDownNum}s后再获取` : '获取验证码'
                  }}</span
                >
              </template>
            </van-field>
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
                :disabled="loginLoading"
                loading-text="登录中..."
              >
                登录
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
      <!-- 第三方登录 -->
      <div class="login-type">
        <div class="login-type-line">
          <span>第三方登录</span>
        </div>
        <c-icon iconname="consult-alipay" :size="35"></c-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
// vue
import { ref, onUnmounted } from 'vue'
// 导入表单验证规则
import { mobileRule, passwordRule } from '@/utils/rules'
// vant
import { showToast, showSuccessToast, type FormInstance } from 'vant'
// api
import { loginPassword, getMobileCode, loginCode } from '@/services/public'
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
// vant form ref
const vantForm = ref<FormInstance>()
// 表单提交项目
const formData = ref({
  // 手机号
  mobile: '13230000001',
  // 密码
  password: 'abc12345',
  // 用户协议
  useragreement: false,
  // 验证码code
  code: ''
})
// 表单的类型
const isPassword = ref(true)
// 验证码计时 60 秒
const countDownNum = ref(0)
// 计时器
let timeId: number
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
    let data = isPassword.value
      ? await loginPassword(formData.value.mobile, formData.value.password)
      : await loginCode(formData.value.mobile, formData.value.code)
    // 存储用户信息
    usersStore.setUser(data.data)
    // 按钮loading 加载
    loginLoading.value = false
    // 登录成功提示
    showSuccessToast('登录成功！')
    // 判断是否需要回调url
    if (route.query.returnUrl) {
      await router.replace(route.query.returnUrl as string)
    } else {
      await router.replace('/')
    }
  } catch (err) {
    loginLoading.value = false
  }
}
// 点击注册
const barRightclick = () => {
  console.log('注册')
}
// 切换登录的方式
const changeLoginType = () => {
  isPassword.value = !isPassword.value
}
// 点击获取验证码
const sendMessageCode = async () => {
  // 清除定时器
  clearInterval(timeId)
  // 判断时间是否正在倒计时
  if (countDownNum.value > 0) return
  // 判断用户手机号是否输入正确
  await vantForm.value?.validate('mobile')
  // 获取验证码
  await getMessageCode()
  // 设置计时60
  countDownNum.value = 3
  // 每隔一秒--
  timeId = window.setInterval(() => {
    countDownNum.value--
  }, 1000)
}
// 获取验证码
const getMessageCode = async () => {
  try {
    const data = await getMobileCode(formData.value.mobile, 'login')
    showToast({
      duration: 2000,
      message: `您的验证码是${data.data.code}`
    })
    // 回填验证码
    formData.value.code = data.data.code
  } catch (err) {
    countDownNum.value = 0
    // 清空定时器
    clearInterval(timeId)
  }
}
// 页面卸载
onUnmounted(() => {
  clearInterval(timeId)
})
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  .login-content {
    position: relative;
  }
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
  .countdownActive {
    opacity: 0.5 !important;
  }
  .login-type {
    margin-top: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-type-line {
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      span {
        width: 100%;
        display: block;
        font-size: 14px;
        color: #ccc;
        text-align: center;
        &::after {
          content: '';
          display: inline-block;
          width: 50px;
          height: 1px;
          background-color: #ccc;
          margin-left: 10px;
          position: relative;
          top: -3px;
        }
        &::before {
          content: '';
          display: inline-block;
          width: 50px;
          height: 1px;
          background-color: #ccc;
          margin-right: 10px;
          position: relative;
          top: -3px;
        }
      }
    }
  }
}
</style>
