<template>
  <van-field
    v-model="value"
    type="textarea"
    placeholder="请输入审批意见"
    @input="inputChange!(value)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const value = ref("");
const props = defineProps({
  inputChange: {
    type: Function,
  },
});
</script>

<style scoped></style>
