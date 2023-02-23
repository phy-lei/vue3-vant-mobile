import { compose } from '@/utils/utils';

/**
 * 调用顺序更改的compose
 * ```js
 * const process = useComposeSugar(fn1,fn2)
 * process((fn1Return) => {xxxx})
 * ```
 */
export default (fn1: (...args: any[]) => void, fn2: (...args: any[]) => void) =>
  (mergeFn: (...args: any[]) => void) =>
    compose(fn2, mergeFn, fn1);
