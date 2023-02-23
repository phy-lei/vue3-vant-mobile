import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/application',
    meta: {
      // keepAlive: true, // 自定义
    },
    component: () => import('@/pages/home/home.vue'),
    children: [
      {
        path: '/application',
        name: 'Application',
        meta: {
          keepAlive: true, // 自定义
          title: '应用',
        },
        component: () => import('@/pages/home/application/application.vue'),
      },
      {
        path: '/userInfo',
        name: 'UserInfo',
        meta: {
          title: '我的',
        },
        component: () => import('@/pages/home/userInfo/userInfo.vue'),
      },
    ],
  },


  {
    path: '/404',
    name: 'Error',
    meta: {
      title: '权限',
    },
    component: () => import('@/pages/404/error.vue'),
  },

  {
    path: '/demo',
    name: 'Demo',
    meta: {
      title: '权限',
    },
    component: () => import('@/pages/demo/demo'),
  },

  {
    path: '/chart',
    name: 'Chart',
    meta: {
      title: '权限',
    },
    component: () => import('@/pages/demo/chart'),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
