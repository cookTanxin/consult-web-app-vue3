<script setup lang="ts">
// type
import type { ConsultOrderItem, EvaluateDoc } from '@/types/room'
// vue
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
// api接口
import { commentDoctor } from '@/services/room'
import { showLoadingToast, showToast } from 'vant'
type Props = {
  evaluateDoc?: EvaluateDoc
}
defineProps<Props>()

const orderInfoData = inject<Ref<ConsultOrderItem>>('orderDetailInfo')
// 依赖注入方法
const changeCommentData = inject<(score: number) => void>('changeCommentData')
// 评分数
const score = ref(0)
// 是否匿名
const anonymity = ref(false)
// 评价的文字
const content = ref('')
// 提交评价
const submitComment = async () => {
  if (!score.value) return showToast('请评分')
  if (!content.value) return showToast('请填写评价内容')
  if (!anonymity.value) return showToast('请匿名')
  let showLoading = showLoadingToast({
    duration: 0,
    message: '提交中...'
  })
  if (!orderInfoData) return showToast('无订单信息')
  let params = {
    // 评分
    score: score.value,
    // 评价内容
    content: content.value,
    // 是否匿名
    anonymousFlag: anonymity.value ? 1 : 0,
    // 医生id
    docId: orderInfoData.value.docInfo.id,
    // 订单id
    orderId: orderInfoData.value.id
  }
  await commentDoctor(params)
  showLoading.close()
  // 依赖注入改变数据
  changeCommentData && changeCommentData(score.value)
}
</script>

<template>
  <div class="comment-card">
    <div class="evaluate-card" v-if="evaluateDoc">
      <p class="title">医生服务评价</p>
      <p class="desc">我们会更加努力提升服务质量</p>
      <template v-if="evaluateDoc && evaluateDoc.score">
        <van-rate
          :model-value="evaluateDoc.score"
          size="7vw"
          gutter="3vw"
          color="#FADB14"
          void-icon="star"
          void-color="rgba(0,0,0,0.04)"
        />
      </template>
    </div>
    <div class="evaluate-card" v-else>
      <p class="title">感谢您的评价</p>
      <p class="desc">本次在线问诊服务您还满意吗？</p>
      <van-rate
        size="7vw"
        gutter="3vw"
        color="#FADB14"
        void-icon="star"
        v-model="score"
        void-color="rgba(0,0,0,0.04)"
      />
      <van-field
        type="textarea"
        maxlength="150"
        show-word-limit
        rows="3"
        v-model="content"
        placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
      ></van-field>
      <div class="footer">
        <van-checkbox v-model="anonymity">匿名评价</van-checkbox>
        <van-button type="primary" size="small" round @click="submitComment">
          提交评价
        </van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-bottom: 40px;
}
.evaluate-card {
  width: 88%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top: 20px;
    :deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        //height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
