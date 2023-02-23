<template>
  <div class="status-bar" @click="goProcessPage">
    <img src="@/assets/orders/list_daiban.png" alt="" />
    <div class="status">
      审批状态：
      <span>{{ statusMap[status] }}</span>
    </div>
    <van-icon style="margin-left: auto" name="arrow" size="22" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const props = defineProps({
  status: {
    type: String,
    default: '0',
  },
});

const statusMap: any = {
  '0': '草稿',
  '1': '审批中',
  '2': '审批通过',
  '-1': '驳回',
};

const router = useRouter();

const goProcessPage = () => {
  router.push({ name: 'ApprovalProcess' });
};
</script>

<style lang="less" scoped>
.status-bar {
  display: flex;
  position: relative;
  align-items: center;
  margin: 10px auto;
  padding: 0 10px;
  border-radius: 8px;
  width: 96%;
  height: 36px;
  background: #fff;
  .status {
    margin-left: 9px;
    span {
      color: #4277bd;
    }
  }
}
</style>
