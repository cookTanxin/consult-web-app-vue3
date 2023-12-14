<script setup lang="ts" name="addEditPatient">
// vue
import { computed, ref } from 'vue'
// rule
import { idcardRule, userNameRule } from '@/utils/rules'
// vant UI
import { type FormInstance, showToast, showDialog } from 'vant'
// api
import { addPatient, updatePatient, deletePatient } from '@/services/patient'
// type
import type { PatientFormData } from '@/types/patient'
// vant form ref
const vantForm = ref<FormInstance>()
// 自定义事件
type Emits = {
  (e: 'refresh'): void
}
const emit = defineEmits<Emits>()
// 状态值
const state = ref({
  // 弹窗是否显示
  showRight: false,
  // form表单数据
  formData: {
    // 姓名
    name: '',
    // 患者身份证号
    idCard: '',
    // 是否设置为默认患者
    defaultFlag: 0,
    // 性别
    gender: 1,
    //id
    id: ''
  },
  // 弹窗类型
  type: 'add'
})
// 性别选项
const genderOptions = [
  {
    name: '男',
    value: 1
  },
  {
    name: '女',
    value: 0
  }
]

// 初始化表单
const initForm = {
  // 姓名
  name: '',
  // 患者身份证号
  idCard: '',
  // 是否设置为默认患者
  defaultFlag: 0,
  // 性别
  gender: 1,
  //id
  id: ''
}
// 支持复选框
const defaultFlag = computed({
  get: () => {
    return !!state.value.formData.defaultFlag
  },
  set: (value) => {
    return (state.value.formData.defaultFlag = value ? 1 : 0)
  }
})
// 打开弹窗
const openPopup = (type: string, item: any) => {
  if (type === 'edit') {
    let { id, name, idCard, gender, defaultFlag } = item
    state.value.formData = { id, name, idCard, gender, defaultFlag }
  }
  state.value.type = type
  state.value.showRight = true
}
// 关闭弹窗
const closePopup = () => {
  // 清空表单信息
  vantForm.value?.resetValidation()
  // 解构对象可以 取消 引用关系
  state.value.formData = { ...initForm }
  state.value.showRight = false
}
// 右侧保存
const rightSave = async () => {
  try {
    await vantForm.value?.validate()
    let params: PatientFormData = {
      name: state.value.formData.name,
      idCard: state.value.formData.idCard,
      defaultFlag: state.value.formData.defaultFlag ? 1 : 0,
      gender: state.value.formData.gender
    }
    if (state.value.type === 'add') {
      await addPatient(params)
      showToast('添加成功')
    } else {
      await updatePatient(state.value.formData)
      showToast('编辑成功！')
    }
    closePopup()
    emit('refresh')
  } catch (error) {
    showToast('请填写表单信息')
  }
}

// 删除患者
const delPatient = () => {
  showDialog({
    title: '温馨提示',
    message: '确认删除吗？',
    showCancelButton: true
  })
    .then(async () => {
      await deletePatient(state.value.formData.id)
      showToast('删除成功')
      closePopup()
      emit('refresh')
    })
    .catch(() => {})
}

// 导出方法和数据
defineExpose({
  openPopup
})
</script>

<template>
  <div class="addEditPatient-popup">
    <van-popup
      v-model:show="state.showRight"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <!-- 自定义导航组件 -->
      <c-nav-bar
        :leftArrow="true"
        :title="state.type === 'add' ? '添加档案' : '修改档案'"
        border
        :back="closePopup"
        rightText="保存"
        @rightClick="rightSave"
      ></c-nav-bar>
      <!--表单区域-->
      <div class="patient-form-area">
        <van-form ref="vantForm">
          <van-field
            v-model="state.formData.name"
            label="真实姓名"
            placeholder="请填写姓名"
            :rules="userNameRule"
          />
          <van-field
            v-model="state.formData.idCard"
            type="number"
            label="身份证"
            placeholder="请输入身份证号码"
            :rules="idcardRule"
          />
          <van-field label="性别">
            <template #input>
              <c-radio
                :listdata="genderOptions"
                v-model="state.formData.gender"
              ></c-radio>
            </template>
          </van-field>
          <van-field label="是否默认">
            <template #input>
              <van-checkbox v-model="defaultFlag"></van-checkbox>
            </template>
          </van-field>
        </van-form>
      </div>
      <van-action-bar v-if="state.type === 'edit'">
        <van-action-bar-button type="primary" text="删除" @click="delPatient" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style scoped lang="scss"></style>
