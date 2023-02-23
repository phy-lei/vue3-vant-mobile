<template>
  <div class="home">
    <router-view v-slot="{ Component }">
      <keep-alive :max="5">
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/application" icon="apps-o">应用</van-tabbar-item>
      <van-tabbar-item replace to="/userInfo" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts">
import { genAuthApi } from '@/services/home/index';
import { getUrlKey } from '@/utils/utils';
import { IS_DEV } from '@/utils/const';
import { UserInfoDto } from '../../services/home/response.dto';

const getUserInfo = async () => {
  let userInfo: UserInfoDto = {} as UserInfoDto;
  if (IS_DEV()) {
    userInfo = await genAuthApi({ mobile: 13066281031 });
    console.log('%c [ useInfo ]', 'font-size:13px; background:pink; color:#bf2c9f;', userInfo);
  } else {
    userInfo = getUrlKey('data', window.location.href);
  }
  localStorage.token = userInfo.token;
  localStorage.employeeId = userInfo.employeeId;
  localStorage.erpname = userInfo.erpname;
};

getUserInfo();
</script>

<style lang="less" scoped></style>
