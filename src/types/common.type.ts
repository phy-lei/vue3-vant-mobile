import { DefineComponent, VNode } from 'vue';
export interface ParamsPage {
  /** 当前页 */
  pageNo?: number;
  /** 单页显示条数 */
  pageSize?: number;
}

export interface PageList<T> {
  /** 是否有下一页 */
  has_nextPage?: boolean;
  /** 是否有上一页 */
  has_prePage?: boolean;
  /** 数据列表 */
  list: T[];
  /** 当前页 */
  pageNo: number;
  /** 单页显示条数 */
  pageSize?: number;
  /** 总页数 */
  totalPages?: number;
  /** 总条数 */
  totalRows: number;
}

export type createGenericListComponent = <T extends { id: string }>() => DefineComponent<
  { items: T[] }, // Props
  { default: ({ item }: { item: T }) => VNode[] } // Slots
>;
