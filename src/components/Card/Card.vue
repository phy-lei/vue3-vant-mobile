<template>
  <div class="Card">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.Card {
  position: relative;
  margin: 10px auto;
  border-radius: 5px;
  width: 96%;
  background: #fff;
  overflow: hidden;
}
</style>
