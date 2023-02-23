import { VNode, createVNode, render, VNodeTypes, App } from "vue";
import DynamicDialog from "./amap-choose.vue";
import { GD_WEB_KEY, GD_JS_KEY } from '@/utils/const';

let uid = 0;
let prevPromise: any;
// 生成dom id
const generateDomId = (id: number) => `dynamic-dialog-map-container${id}`;

const createMapDialog = (app: App) => (
  params: { initLocation: string } & Record<string, any>,
): Promise<{ address: string, location: string, adcode: string } | null> =>
  /**
   * 目的：解决点击相同类型弹窗不在开窗
   * 实现：利用promise 做发布订阅 弹窗调用方式().then 就是destroy 执行的时机 方便穿插callback
   */
  new Promise(resolve => {

    // 上一个dom
    const prevContainer = document.getElementById(generateDomId(uid));

    if (prevContainer) {
      render(null, prevContainer);
      document.body.removeChild(prevContainer);
      // 上一个的发布destroy 外层执行callback 注意这里要用prevPromise
      prevPromise(null);
    }
    // 上一个调用者的订阅
    prevPromise = resolve;
    uid++;

    const container = document.createElement("div");
    container.id = generateDomId(uid);

    // 实例销毁方法
    const destroy = (data?: { address: string, location: string, adcode: string }) => {
      render(null, container);
      document.body.removeChild(container);
      // 发布destroy 外层执行callback
      resolve(data ? data : null);
    };

    const vnode = createVNode(
      DynamicDialog,
      {
        keyMap: GD_JS_KEY,
        AMapKeyWeb: GD_WEB_KEY,
        ...params,
        destroy
      },

    );

    // 存储上下文对象 须在render之前 不然组件内获取须在mounted里
    vnode.appContext = app._context;
    render(vnode, container);

    document.body.appendChild(container);

  });

export const destroyAllMapDialog = () => {
  const targetDialog = document.getElementById(generateDomId(uid));
  if (targetDialog) {
    document.body.removeChild(targetDialog);
    prevPromise(null);
  }
};

export default createMapDialog;