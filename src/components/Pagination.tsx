import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import { type PaginationProps, paginationProps } from "./types";
import { cloneDeep } from 'lodash';
import './index.css'

export default defineComponent({
  name: "SimpleTable",
  props: paginationProps,
  setup(props: PaginationProps, { attrs, emit, slots }) {

    // 当前页面
    let currentPage = ref(1)

    // 跳转页码
    let inputValue = ref('')

    // 根据显示长度计算边界值：长度5  边界为3
    let borderNumber = computed(() => Math.ceil(props.showMaxLength / 2))

    const jumpToPage = (num: number) => {
      inputValue.value = ''

      // 手动输入的跳转页码不在范围内，直接不做跳转
      if (num < 1 || num > maxPage.value) {
        return
      }
      currentPage.value = num
    }

    const pageAdd = (num: number) => {
      currentPage.value += num
    }

    // 最大页码
    const maxPage = computed(() => Math.ceil(props.total / props.limit))

    // 页码数组
    let pageList = reactive([1])

    watchEffect(() => {

      // 计算出的页码 小于1 ，要么计算有误，要么接口参数返回有误
      if (maxPage.value <= 1) {
        return
      }

      // 最大页码  小于 连续显示最大长度：1,2,3,4,5
      if (maxPage.value <= props.showMaxLength) {
        let curArray = []
        for (let i = 0; i < maxPage.value; i++) {
          curArray.push(i + 1)
        }
        pageList = cloneDeep(curArray)
        return
      }

      if (currentPage.value < borderNumber.value) {
        let curArray = [1, 2, 3, 4, 5, maxPage.value]
        pageList = cloneDeep(curArray)
        return
      }

      if (currentPage.value >= (maxPage.value - 2)) {
        let curArray = [1, maxPage.value - 4, maxPage.value - 3, maxPage.value - 2, maxPage.value - 1, maxPage.value]
        pageList = cloneDeep(curArray)
        return
      }

      if (currentPage.value > (1 + 2) && currentPage.value < (maxPage.value - 2)) {
        let curArray = [1]
        for (let i = currentPage.value - 2; i < currentPage.value + 2; i++) {
          curArray.push(i)
        }
        curArray.push(maxPage.value)
        pageList = cloneDeep(curArray)
      }

    })

    return () => {
      return (
        <div class='pagination-wrap'>
          <span>当前第{currentPage.value}页</span>

          {
            currentPage.value > 1 &&
            <span
              class='pagination-wrap-btn'
              onClick={() => pageAdd(-1)}
            >
              {'<'}
            </span>
          }

          {
            pageList.map(page => (
              <span
                key={page}
                class={
                  `pagination-wrap-context 
                  page-${(currentPage.value - borderNumber.value > 1 && page === 1) ? 'after' : ''} 
                  page-${(currentPage.value + borderNumber.value <= maxPage.value && page === maxPage.value) ? 'before' : ''} 
                  ${page === currentPage.value && 'current'}`
                }
                onClick={() => jumpToPage(page)}
              >
                {page}
              </span>
            ))
          }

          {
            currentPage.value < maxPage.value &&
            <span
              class='pagination-wrap-btn'
              onClick={() => pageAdd(1)}
            >
              {'>'}
            </span>
          }
          <span class='pagination-wrap-right-input-wrap'>
            <span>跳转到</span>
            <input
              type="number"
              class='input'
              value={inputValue}
              onBlur={e => jumpToPage(Number(e.target.value))}
            />
            <span>页</span>
          </span>
        </div>
      );
    };
  },
});
