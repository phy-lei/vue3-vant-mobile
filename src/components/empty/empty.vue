<template>
  <div class="empty-box">
    <img src="@/assets/userInfo/empaty.png" alt="" />
    <div>{{ text }}</div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
});
</script>
<style lang="less" scoped>
.empty-box {
	margin: 80px auto;
	text-align: center;
	font-size: 14px;
	color: #a0a0a0;
}

</style>
