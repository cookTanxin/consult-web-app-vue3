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
            v-model="submitData.illnessDesc"
            rows="6"
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
              :max-size="500 * 1024"
              upload-icon="smile"
              upload-text="上传吧！"
              @delete="onDeleteImg"
              @oversize="onOversize"
              :after-read="uploadAfter"
            />
          </div>
          <!-- 提交按钮 -->
          <div class="submit-button">
            <van-button type="primary" block round>下一步</van-button>
          </div>
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { ref } from 'vue'
// vant
import { showToast } from 'vant'
// 枚举
import { IllnessTime } from '@/enums/index'
import type { IllnessFormData } from '@/types/consult'
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
const uploadFiles = ref([])
// 提交表单数据
const submitData = ref<IllnessFormData>({})
// 限制图片上传大小
const onOversize = () => {
  showToast('图片太大了,缩小图片哦！')
}
// 删除图片
const onDeleteImg = () => {
  console.log('delete')
}
// 上传图片完成以后事件
const uploadAfter = (file) => {
  console.log('上传完成')
  console.log(file)
}
</script>

<style scoped lang="scss">
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
