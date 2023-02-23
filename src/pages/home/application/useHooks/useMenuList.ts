export default () => {
  const menuMap: any = {

    demo: {
      children: {
        demo1: {
          // iconUrl: new URL('@/assets/home/application_29.png', import.meta.url).href,
          pathName: 'Demo',
        },
        demo2: {
          // iconUrl: new URL('@/assets/home/application_30.png', import.meta.url).href,
          pathName: 'Chart',
        },
      },
    },
  };

  // 页面菜单顺序
  const order = [];

  return {
    order,
    menuMap,
  };
};
