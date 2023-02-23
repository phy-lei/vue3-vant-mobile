<template>
  <!-- 利用缓存的时间戳key 保证页面保鲜 -->
  <router-view v-slot="{ Component }">
    <!-- 缓存模式 -->
    <keep-alive :max="5">
      <component
        :is="Component"
        v-if="$route.meta.keepAlive"
        :key="$route.meta.keepAlive ? kEEP_ALIVE_MAP.get($route.name) : $route.path"
      />
    </keep-alive>

    <!-- 普通模式 -->
    <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
  </router-view>
</template>

<script setup lang="ts">
import useCache from '@/useHooks/useCache';
const { kEEP_ALIVE_MAP } = useCache();
</script>

<style>
#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
</style>
