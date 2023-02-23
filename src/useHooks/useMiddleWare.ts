import { reactive } from 'vue';


// 用到的event发布订阅 这里作为统一管理 注释说明 
// key为事件名 value为说明
interface EventNameMap {
  SET_CUSTOMER: '销售订单/客户查询回传';
  SET_GOODS_LIST: '销售订单/添加商品回传';
}


const middleWare = reactive<Record<string, any[]>>({});

const useMiddleWare = () => {
  /**
   * 发布者
   * @param {any} eventName:string
   * @param {any} ...rest:any
   * @returns {any}
   */
  const $emit_phy = <T extends keyof EventNameMap>(eventName: T, ...rest: any) => {
    middleWare[eventName] &&
      middleWare[eventName].forEach((fn: (...args: any[]) => void) => fn(...rest));
  };

  /**
   * 订阅者
   * @param {any} eventName:string
   * @param {any} fn:注册的回调函数
   * @returns {any}
   */
  const $on_phy = <T extends keyof EventNameMap>(eventName: T, fn: (...rest: any[]) => void) => {
    if (middleWare[eventName]) {
      middleWare[eventName].push(fn);
    } else {
      middleWare[eventName] = [fn];
    }
  };

  /**
   * 单例订阅者
   * @param {any} eventName:string
   * @param {any} fn:注册的回调函数
   * @returns {any}
   */
  const $on_once_phy = <T extends keyof EventNameMap>(eventName: T, fn: (...rest: any[]) => void) => {
    middleWare[eventName] = [fn];
  };

  /**
   * 移除单个订阅事件
   * @param {any} eventName:string
   * @param {any} fn:(
   * @returns {any}
   */
  const removeListener = <T extends keyof EventNameMap>(eventName: T, fn: (...args: any[]) => void) => {
    if (middleWare[eventName]) {
      middleWare[eventName] = middleWare[eventName].filter((cb: (...args: any[]) => void) => cb !== fn);
    }
  };

  /**
   * 清空MiddleWare
   * @returns {any}
   */
  const initMiddleWare = () => {
    for (const key in middleWare) {
      delete middleWare[key];
    }
  };

  return {
    $on_once_phy,
    $on_phy,
    $emit_phy,
    removeListener,
    initMiddleWare,
  };
};

export default useMiddleWare;
