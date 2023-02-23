import { unref, reactive, computed } from 'vue';

export default () => {
  const pageParams = reactive<{
    pageNo: number;
    pageSize: number;
    totalRows?: number;
  }>({
    pageNo: 1,
    pageSize: 20,
    totalRows: 999999999999,
  });

  let observeLength: any;
  // 初始化完成状态
  let _renderComplete: any;
  // 初始化loading
  let _httpFinish: any;
  // 处理响应式的当前列表长度
  const rxLen = (cb: () => void) => {
    observeLength = computed(cb);
  };

  const initPage = () => {
    Object.assign(pageParams, {
      pageNo: 1,
      pageSize: 20,
      totalRows: 999999999999,
    });
    _renderComplete && _renderComplete(false);
    _httpFinish && _httpFinish(false);
  };

  // 页面到底事件 滚动分页
  const createReachBottom =
    (httpRequest: () => void) =>
      async (
        httpFinish: (isLoading: boolean) => void,
        renderComplete: (isComplete: boolean) => void
      ) => {
        // 已加载完全部数据
        if (unref(observeLength) >= pageParams.totalRows!) {
          _renderComplete = renderComplete;
          renderComplete(true);
          return;
        }
        pageParams.pageNo++;
        try {
          await httpRequest();
        } finally {
          _httpFinish = httpFinish;
          httpFinish(false);
        }
      };

  return {
    pageParams,
    rxLen,
    initPage,
    createReachBottom,
  };
};
