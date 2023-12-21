<template>
  <div class="consult-illness">
    <!-- 自定义导航 -->
    <c-nav-bar :leftArrow="true" title="问诊记录" border></c-nav-bar>
    <!-- 顶部样式区域 -->
    <div class="consult-illness-top-content">
      <div class="consult-illness-doctor-img">
        <img src="../../../assets//avatar-doctor.svg" alt="doctor-img" />
      </div>
      <div class="consult-illness-doctor-info">
        <p class="consult-illness-title">在线医生</p>
        <span class="consult-illness-desc"
          >请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</span
        >
        <div class="doctor-warn">
          <c-icon iconname="consult-safe"></c-icon>
          <span>内容仅医生可见</span>
        </div>
      </div>
    </div>
    <!-- 患者信息录入区域 -->
    <div class="consult-illness-form">
      <!-- 病情 -->
      <van-form>
        <van-cell-group :border="false">
          <van-field
            size="normal"
            v-model="submitData.illnessDesc"
            rows="3"
            :border="false"
            type="textarea"
            placeholder="请详细描述您的病情，病情描述不能为空"
          />
          <!-- 本次患病多久了 -->
          <div class="form-item-content">
            <p class="form-item-title">本次患病多久了</p>
            <c-radio
              :listdata="illnessTimeOptions"
              v-model="submitData.illnessTime"
            ></c-radio>
          </div>
          <!-- 此次病情是否去医院就诊过？ -->
          <div class="form-item-content">
            <p class="form-item-title">此次病情是否去医院就诊过？</p>
            <c-radio
              :listdata="consultFlagOptions"
              v-model="submitData.consultFlag"
            ></c-radio>
          </div>
          <!-- 上传图片 -->
          <div class="form-item-content">
            <p class="form-item-title">上传内容仅医生可见,最多9张图,最大5MB</p>
            <van-uploader
              v-model="uploadFiles"
              :max-count="3"
              multiple
              :max-size="2 * 1024 * 1024"
              upload-icon="smile"
              upload-text="上传吧！"
              @delete="onDeleteImg"
              @oversize="onOversize"
              :after-read="onAfterRead"
            />
          </div>
          <!-- 提交按钮 -->
          <div class="submit-button">
            <van-button
              type="primary"
              @click="onSubmit"
              :class="{ disabled }"
              block
              round
              >下一步</van-button
            >
          </div>
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { ref, computed, onMounted } from 'vue'
// vant
import { showToast, showConfirmDialog } from 'vant'
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from 'vant/lib/uploader/types'
// 枚举
import { IllnessTime } from '@/enums/index'
// 类型
import type { IllnessFormData, Image } from '@/types/consult'
// api
import { uploadFile } from '@/services/public'
// store
import { useConsult } from '@/stores'
// router
import { useRouter } from 'vue-router'
// store
const useStore = useConsult()
// router
const router = useRouter()
// 患病时间1一周内2一月内3半年内4半年以上
const illnessTimeOptions = [
  { name: '一周内', value: IllnessTime.Week },
  { name: '一月内', value: IllnessTime.Month },
  { name: '半年内', value: IllnessTime.HalfYear },
  { name: '半年以上', value: IllnessTime.More }
]
// 找医生/极速问诊-是否就诊过0未就诊1就诊过
const consultFlagOptions = [
  { name: '未就诊', value: 0 },
  { name: '就诊过', value: 1 }
]
// 上传图片数据
const uploadFiles = ref<Image[]>()
// 提交表单数据 需要初始变量啊！！！！
const submitData = ref<IllnessFormData>({
  illnessDesc: '',
  illnessTime: undefined,
  pictures: [],
  consultFlag: undefined
})
// 限制图片上传大小
const onOversize = () => {
  showToast('图片太大了,缩小图片哦！')
}
// 删除图片
const onDeleteImg = (item: UploaderFileListItem) => {
  // 把点击删除的id数据过滤掉
  submitData.value.pictures = submitData.value.pictures?.filter(
    (pic) => item.url != pic.url
  )
}
// 上传图片完成以后事件
const onAfterRead: UploaderAfterRead = async (item) => {
  if (Array.isArray(item)) return
  if (!item.file) return
  item.status = 'uploading'
  item.message = '上传中'
  const imgData = await uploadFile(item.file)
  // 给数据对象添加id 方便到时候删除
  item.url = imgData.data.url
  // 往表单中添加数据
  submitData.value.pictures?.push(imgData.data)
  item.status = 'done'
  item.message = undefined
}
// 动态计算按钮是否可以点击下一步
const disabled = computed(
  () =>
    submitData.value.consultFlag === undefined ||
    submitData.value.illnessDesc === '' ||
    submitData.value.illnessTime === undefined
)
// 提交数据
const onSubmit = () => {
  if (!submitData.value.illnessDesc) {
    showToast('请输入病情')
    return
  }
  if (!submitData.value.illnessTime) {
    showToast('请选择患病时间')
    return
  }
  if (submitData.value.consultFlag === undefined) {
    showToast('请选择是否就诊过')
    return
  }
  // 把数据存储在 store 中
  useStore.setIllnessFormData(submitData.value)
  // 跳转页面
  router.push({
    path: '/user/patient',
    query: {
      isChange: 1
    }
  })
}
// 判断之前用户是否填写信息 如果填写了 询问用户是否回填
const checkUserFormData = () => {
  if (useStore.consultData.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复之前填写的信息？',
      closeOnPopstate: false
    })
      .then(() => {
        const { illnessDesc, illnessTime, consultFlag, pictures } =
          useStore.consultData
        submitData.value = { illnessDesc, illnessTime, consultFlag, pictures }
        uploadFiles.value = pictures || []
      })
      .catch(() => {
        router.push({
          path: '/'
        })
        useStore.clearConsultFormData()
      })
  }
}
onMounted(() => {
  // 判断用户之前是否填写信息
  checkUserFormData()
})
</script>

<style scoped lang="scss">
::v-deep() {
  .van-button {
    &.disabled {
      opacity: 0.5 !important;
    }
  }
}
.consult-illness {
  .consult-illness-top-content {
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    .consult-illness-doctor-img {
      img {
        display: block;
        width: 50px;
        height: 50px;
      }
    }
    .consult-illness-doctor-info {
      margin-left: 20px;
      .consult-illness-title {
        font-size: 14px;
      }
      .consult-illness-desc {
        font-size: 11px;
        line-height: 16px;
        display: inline-block;
        background-color: var(--cp-plain);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 6px;
        margin: 10px 0;
      }
      .doctor-warn {
        display: flex;
        align-items: center;
        .c-icon {
          font-size: 12px;
        }
        span {
          font-size: 10px;
          margin-left: 3px;
        }
      }
    }
  }
  .consult-illness-form {
    .form-item-content {
      padding: 16px 16px 0 16px;
      .form-item-title {
        font-size: 14px;
        color: var(--cp-primary);
        margin-bottom: 12px;
      }
    }
    .submit-button {
      margin: 16px 16px 30px 16px;
    }
  }
}
</style>
