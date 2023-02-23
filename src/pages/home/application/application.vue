<template>
  <div class="application">
    <van-sidebar v-model="activeIndex" class="sidebar">
      <van-sidebar-item v-for="(item, index) in menuList" :key="index" :title="item.name" />
    </van-sidebar>

    <div class="icon-list">
      <div
        v-for="(item, index) in menuList[activeIndex]?.children"
        :key="index"
        class="img-box"
        @click="toMenuPage(item.pathName)"
      >
        <img :src="item.iconUrl" alt="" />
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useMenuList from './useHooks/useMenuList';
import { getMenusApi } from '@/services/home/index';
import { useRouter } from 'vue-router';
import useCache from '@/useHooks/useCache';

type MenuListDto = PromiseReturnType<typeof getMenusApi>;

const router = useRouter();
const { setKeepAlive } = useCache();
const activeIndex = ref(0);
const { menuMap, order } = useMenuList();
const menuList = ref<any[]>([]);

// 跳转的页面需要卸载缓存的
const freshRouteMap = [
  'AddOrder',
  'AddTerminal',
  'AddBusiness',
  'AddActivity',
  'TerminalSalesAnalysis',
];

const toMenuPage = (name: string) => {
  if (freshRouteMap.includes(name)) {
    setKeepAlive(name, new Date().getTime());
  }
  router.push({ name });
};

// 组合处理菜单
const generatorMenu = (target: MenuListDto, orderList: string[]) => {
  const arr: any[] = [];
  orderList.forEach((key) => {
    if (target[key as keyof MenuListDto]) {
      arr.push({ name: key, children: [] });
      target[key as keyof MenuListDto].forEach((menu: any) => {
        arr[arr.length - 1].children.push({
          name: menu.opname,
          ...menuMap[key].children[menu.opname],
        });
      });
    }
  });
  return arr;
};

const getMenus = async () => {
  const res = await getMenusApi();
  menuList.value = generatorMenu(res, order);
};
getMenus();
</script>

<style lang="less" scoped>
.application {
  display: flex;
  .sidebar {
    height: calc(100vh - var(--van-tabbar-height) - env(safe-area-inset-bottom));
    background: var(--van-sidebar-background);
  }
  .icon-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    flex: 1;
    padding: 30px;
    font-size: 13px;
    .img-box {
      margin-right: 27px;
      margin-bottom: 32px;
      width: 60px;
      height: 80px;
      text-align: center;
    }
    .img-box:nth-child(3n) {
      margin-left: auto;
      margin-right: 0;
    }
  }
}
</style>
