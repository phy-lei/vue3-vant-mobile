<template>
  <div class="userInfo">
    <van-tabs v-model:active="active" color="#427CE9">
      <van-tab :title="`待办事项（${toDoList.length}）`">
        <div class="wrap">
          <div v-if="toDoList.length">
            <div v-for="(item, index) in toDoList" :key="index" class="list-item">
              <div class="top">
                <img src="@/assets/userInfo/task_line.png" alt="" />
                <span>您有一条销售订单待审批。</span>
                <span class="text-btn" @click="$router.push('/salesOrder')">去查看</span>
              </div>
              <div class="bottom">09-23 12:34</div>
            </div>
          </div>

          <Empty v-else text="您无待办事项"></Empty>
        </div>
      </van-tab>
      <van-tab :title="`消息通知（${notificationList.length}）`">
        <div class="wrap">
          <div v-if="notificationList.length">
            <div v-for="(item, index) in notificationList" :key="index" class="list-item">
              <div class="top">
                <img src="@/assets/userInfo/message.png" alt="" />
                <span>您有一条销售订单待审批。</span>
                <span class="text-btn" @click="$router.push('/salesOrder')">去查看</span>
              </div>
              <div class="bottom">09-23 12:34</div>
            </div>
          </div>

          <Empty v-else text="您无消息通知"></Empty>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Empty from '@/components/Empty/Empty.vue';
const toDoList = Array.from({ length: 20 }).fill(1);
const notificationList = [1, 2];
const active = ref(0);
</script>

<style lang="less" scoped>
@content_h: calc(100vh - var(--van-tabbar-height) - env(safe-area-inset-bottom));
.userInfo {
  height: @content_h;
  background: @gray;
  font-size: 14px;
  .wrap {
    overflow-y: auto;
    height: calc(@content_h - var(--van-tabs-line-height));
    background: #fff;
  }
  .list-item {
    margin: 0 auto;
    padding: 15px 10px 14px 2px;
    border-bottom: 1px solid #ededed;
    width: 349px;
    height: 65px;

    .top {
      display: flex;
      align-items: center;
      img {
        margin-right: 8px;
      }
      .text-btn {
        margin-left: auto;
        color: @blue;
      }
    }
    .bottom {
      margin-top: 6px;
      text-indent: 22px;
      font-size: 12px;
      color: #999;
    }
  }
  .list-item:last-child {
    border-bottom: none;
  }
}
</style>
