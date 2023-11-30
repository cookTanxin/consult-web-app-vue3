<script setup lang="ts">
// types
import type { Knowledge } from '@/types/home'
import type { FollowParams } from '@/types/common'
import { ref } from 'vue'
type Props = {
  item: Knowledge
}
const props = defineProps<Props>()
// api
import { followData } from '@/services/user'
// 关注按钮是否正在更新
const btnLoading = ref(false)
// 点击关注
const followClick = async (item: { id: string; likeFlag: number }) => {
  let params: FollowParams = {
    type: 'knowledge',
    id: props.item.id
  }
  // 按钮加载
  btnLoading.value = true
  try {
    await followData(params)
    // 更新视图
    item.likeFlag = item.likeFlag === 1 ? 0 : 1
    btnLoading.value = false
  } catch (e) {
    // 失败执行函数
    btnLoading.value = false
  } finally {
    // 不管成功还是失败都会执行
    btnLoading.value = false
  }
}
</script>

<template>
  <div class="home-list-item">
    <div class="item-heade">
      <div class="item-head-left">
        <div class="item-head-avatar">
          <img :src="item.creatorAvatar" alt="" />
        </div>
        <div class="item-head-doctor-info">
          <div class="item-head-doctor-name">{{ item.creatorName }}</div>
          <div class="item-head-doctor-desc">
            {{ item.creatorHospatalName }}
          </div>
        </div>
      </div>
      <div class="follow-button">
        <van-button
          plain
          size="small"
          type="primary"
          round
          :loading="btnLoading"
          loading-text="处理中"
          @click="followClick(item)"
          >{{ item.likeFlag === 1 ? '已关注' : '加关注' }}</van-button
        >
      </div>
    </div>
    <div class="item-title">
      <p>{{ item.title }}</p>
    </div>
    <div class="item-tag">
      <p v-for="(tagitem, tagindex) in item.topics" :key="tagindex">
        {{ tagitem }}
      </p>
    </div>
    <div class="item-desc">
      <p class="van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
    </div>
    <div class="item-list-img">
      <van-image
        v-for="imgitem in item.coverUrl"
        :key="imgitem"
        :src="imgitem"
        fit="cover"
      />
    </div>
    <div class="item-comment-collect">
      <p>{{ item.collectionNumber }}收藏</p>
      <p>{{ item.commentNumber }}评价</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-list-item {
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  .item-heade {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-head-left {
      display: flex;
      align-items: center;
      .item-head-avatar {
        width: 50px;
        height: 50px;
        background: #f5f5f5;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 50%;
        }
      }
      .item-head-doctor-info {
        margin-left: 14px;
        .item-head-doctor-name {
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .item-head-doctor-desc {
          font-size: 12px;
          color: #ccc;
        }
      }
    }
  }
  .item-title {
    font-size: 16px;
    font-weight: bold;
    margin: 13px 0;
  }
  .item-tag {
    margin-bottom: 13px;
    font-size: 14px;
    color: var(--cp-primary);
  }
  .item-desc {
    font-size: 13px;
    color: var(--cp-tag);
  }
  .item-list-img {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: space-between;
    .van-image {
      width: 106px;
      height: 106px;
      margin-right: 12px;
      border-radius: 12px;
      overflow: hidden;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .item-comment-collect {
    font-size: 12px;
    color: var(--cp-tag);
    display: flex;
    align-items: center;
    p {
      margin-right: 10px;
    }
  }
}
</style>
