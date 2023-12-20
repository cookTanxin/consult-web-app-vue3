<template>
  <div class="patient-page">
    <!-- 自定义导航组件 -->
    <c-nav-bar
      :leftArrow="true"
      :title="isChange ? '选择患者' : '家庭档案'"
      border
    ></c-nav-bar>
    <!--家庭档案列表-->
    <div class="family-list-container">
      <div class="select-patient" v-if="isChange">
        <p>选择患者</p>
        <span>以便医生给出更准确的治疗，信息仅医生可见</span>
      </div>
      <div class="famliy-list-limit" v-else>最多添加6人</div>
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
          @click="onSelectPatient(item)"
          :class="{ active: selectPatientId == item.id }"
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
    <!-- 下一步按钮区域 -->
    <div class="next-area" v-if="isChange">
      <van-button type="primary" round block @click="onNext">下一步</van-button>
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
import { onMounted, ref, computed } from 'vue'
// vue-route
import { useRoute, useRouter } from 'vue-router'
// type
import type { Patient } from '@/types/patient'
// vant
import { showToast } from 'vant'
// 添加患者弹窗
import addEditPatient from './component/addEditPatient.vue'
// store
import { useConsult } from '@/stores'
// store
// 患者列表数据
const patientList = ref<Patient[]>([])
// 数据是否在加载
const firstLoad = ref(false)
// 选中的患者的id
const selectPatientId = ref('')
// route
const route = useRoute()
// router
const router = useRouter()
// store
const useStore = useConsult()
// 弹窗ref
const addEditPatientRef = ref<{
  openPopup: (type: string, item: any) => void
}>()
// 选择患者
const onSelectPatient = (item: Patient) => {
  if (isChange.value) {
    selectPatientId.value = item.id || ''
  }
}
// 获取家庭患者列表数据
const getPatientData = async () => {
  firstLoad.value = true
  const data = await getPatientListdata()
  patientList.value = data.data
  firstLoad.value = false
  // 设置默认选中
  if (data.data.length > 0 && isChange.value) {
    selectPatientId.value = data.data[0].id || ''
  }
}
// 添加患者
const addPatient = (type: string, item?: {}) => {
  // 判断是否能添加
  if (patientList.value.length >= 6) {
    showToast('只能添加6位哦！')
    return
  }
  // 打开弹窗
  addEditPatientRef.value?.openPopup(type, item)
}

// 点击下一步
const onNext = () => {
  useStore.setPatientId(selectPatientId.value)
  // go to pay page
  router.push({
    path: '/consult/pay'
  })
}

// 是否为咨询页面跳转过来的
const isChange = computed(() => route.query.isChange === '1')

onMounted(() => {
  // 获取患者列表数据
  getPatientData()
})
</script>

<style scoped lang="scss">
.patient-page {
  .next-area {
    padding: 16px 16px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
  }
  .family-list-container {
    padding: 16px;
    .select-patient {
      p {
        font-size: 16px;
        font-weight: bold;
      }
      span {
        font-size: 14px;
        color: var(--cp-tag);
      }
    }
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
      &.active {
        border: 1px solid var(--cp-primary);
      }
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
