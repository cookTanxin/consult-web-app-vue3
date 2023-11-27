<template>
  <div class="patient-page">
    <!-- 自定义导航组件 -->
    <c-nav-bar :leftArrow="true" title="家庭档案" border></c-nav-bar>
    <!--家庭档案列表-->
    <div class="family-list-container">
      <div class="famliy-list-limit">最多添加6人</div>
      <van-loading
        size="24px"
        vertical
        v-if="patientList.length == 0 && firstLoad"
      >
        加载中...
      </van-loading>
      <div class="patient-list" v-else>
        <div
          class="family-list-item"
          v-for="(item, index) in patientList"
          :key="index"
        >
          <div class="family-list-item-left">
            <div class="family-list-item-left-userinfo">
              <!--姓名 身份证-->
              <span class="username ellipsis">{{ item.name }}</span>
              <span class="userid">{{ item.idCard }}</span>
              <!--默认tag-->
              <div class="default-icon" v-if="item.defaultFlag">默认</div>
            </div>
            <!--性别 年龄-->
            <div class="family-item-age-gender">
              <span class="gender">{{ item.genderValue }}</span>
              <span class="age">{{ item.age }}</span>
            </div>
          </div>
          <div class="family-list-item-right" @click="addPatient('edit', item)">
            <c-icon iconname="user-edit"></c-icon>
          </div>
        </div>
      </div>
      <!--添加按钮-->
      <div class="family-item-add" @click="addPatient('add')">
        <c-icon iconname="user-add"></c-icon>
        <p>添加患者</p>
      </div>
    </div>
    <!--添加弹窗-->
    <add-edit-patient ref="addEditPatientRef" @refresh="getPatientData">
    </add-edit-patient>
  </div>
</template>

<script setup lang="ts" name="Patient">
// api
import { getPatientListdata } from '@/services/patient'
// vue
import { onMounted, ref } from 'vue'
// type
import type { Patient } from '@/types/patient'
// vant
import { showToast } from 'vant'
// 添加患者弹窗
import addEditPatient from './component/addEditPatient.vue'
// 患者列表数据
const patientList = ref<Patient[]>([])
// 数据是否在加载
const firstLoad = ref(false)
// 弹窗ref
const addEditPatientRef = ref<{
  openPopup: (type: string, item: any) => void
}>()
// 获取家庭患者列表数据
const getPatientData = async () => {
  firstLoad.value = true
  const data = await getPatientListdata()
  patientList.value = data.data
  firstLoad.value = false
}
// 添加患者
const addPatient = (type: string, item?: {}) => {
  // 判断是否能添加
  if (patientList.value.length >= 6) {
    showToast('只能添加6位哦！')
    return
  }
  addEditPatientRef.value?.openPopup(type, item)
}
onMounted(() => {
  // 获取患者列表数据
  getPatientData()
})
</script>

<style scoped lang="scss">
.patient-page {
  .family-list-container {
    padding: 16px;
    .famliy-list-limit {
      font-size: 14px;
      color: var(--cp-text2);
    }
    .family-list-item {
      padding: 18px 13px;
      box-sizing: border-box;
      background-color: #fafafa;
      margin-top: 14px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .family-list-item-left {
        .family-list-item-left-userinfo {
          display: flex;
          align-items: center;
          .default-icon {
            font-size: 8px;
            color: #fff;
            padding: 2px 4px;
            border-radius: 3px;
            background-color: var(--cp-primary);
            margin-left: 10px;
          }
          .username {
            font-weight: bold;
            font-size: 16px;
            max-width: 88px;
          }
          .userid {
            margin-left: 10px;
            font-size: 12px;
          }
        }
        .family-item-age-gender {
          font-size: 12px;
          color: var(--cp-text3);
          margin-top: 14px;
          span {
            &:last-child {
              margin-left: 10px;
            }
          }
        }
      }
      .family-list-item-right {
        .c-icon {
          font-size: 18px;
          color: var(--cp-primary);
        }
      }
    }
    .family-item-add {
      height: 75px;
      display: flex;
      align-items: center;
      margin-top: 18px;
      flex-direction: column;
      justify-content: center;
      background-color: #fafafa;
      .c-icon {
        font-size: 16px;
        color: var(--cp-primary);
      }
    }
  }
}
</style>
