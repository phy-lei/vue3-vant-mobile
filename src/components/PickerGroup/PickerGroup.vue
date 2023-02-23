<template>
  <van-popup v-model:show="show" round closeable position="bottom" :style="{ height: '50%' }">
    <div class="title">{{ title }}</div>
    <div class="content-box">
      <div class="date-tab-box">
        <div class="date-box">2022年9月</div>
        <span>-</span>
        <div class="date-box">2022年9月</div>
      </div>
      <van-date-picker v-model="currentDate" :min-date="minDate" />
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
defineOptions({
  name: 'PickerGroup',
});

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
const show = ref(false);
const currentDate = ref(['2021', '01']);
const minDate = new Date(2020, 0, 1);

defineExpose({ show });
</script>

<style lang="less" scoped>
.title {
  position: relative;
  left: calc(50% - var(--van-popup-close-icon-margin));
  top: var(--van-popup-close-icon-margin);
  font-size: 17px;
  font-weight: 600;
}
.content-box {
  padding-top: calc(var(--van-popup-close-icon-margin) + 20px);
  .date-tab-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    .date-box {
      width: 45%;
      height: 28px;
      text-align: center;
      line-height: 28px;
      background: #f2f2f2;
      border-radius: 2px;
      border: 1px solid #427ce9;
    }
  }
}
</style>
