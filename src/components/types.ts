import { ExtractPropTypes } from "vue";

//  定义 Props
export const tableProps = {
  option: {
    type: Object,
    default: () => { },
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export const paginationProps = {
  // 总条数
  total: {
    type: Number,
    default: 1
  },

  // 每页展示条数
  limit: {
    type: Number,
    default: 10
  },

  // 当前页
  currentPage: {
    type: Number,
    default: 1
  },

  // 连续显示最大长度： 1,2,3,4,5
  showMaxLength: {
    type: Number,
    default: 5
  },
} as const;

export type PaginationProps = ExtractPropTypes<typeof paginationProps>;
