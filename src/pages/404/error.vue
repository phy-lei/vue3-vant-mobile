<template>
  <div class="error-page">
    <div class="tip">
      <img src="@/assets/404/no_authority.png" alt="" />
      <div>您未授权任何应用，请联系系统管理员。</div>
    </div>
    <van-button type="primary" size="large" color="#4277BD">联系管理员</van-button>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.error-page {
	.tip {
		margin-top: 65px;
		margin-bottom: 124px;
		text-align: center;
		font-size: 16px;
		img {
			margin-bottom: 24px;
		}
	}
}

</style>
