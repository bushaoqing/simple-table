import { defineComponent, reactive, ref, watchEffect } from "vue";
import { type TableProps, tableProps } from "./types";
import { cloneDeep } from 'lodash';
import Pagination from "./Pagination";
import './index.css'

export default defineComponent({
  name: 'SimpleTable',
  components: {
    Pagination
  },
  props: tableProps,
  setup(props: TableProps, { attrs, emit, slots }) {

    // 记录点击的排序的key和它点击的次数：0：无序；1：升序；2：降序；
    let currentSortKeyMap = reactive({})

    let currentSortKey = ref('')

    const toggleSort = (sortKey: string) => {
      currentSortKey.value = sortKey;

      if (sortKey in currentSortKeyMap) {
        currentSortKeyMap[sortKey] = (currentSortKeyMap[sortKey] + 1) % 3
      } else {
        currentSortKeyMap[sortKey] = 1
      }
      console.log('currentSortKeyMap: ', currentSortKeyMap)
    }

    let list = reactive(cloneDeep(props.option.data))

    watchEffect(() => {
      const sortKey = currentSortKey.value
      if (!sortKey) {
        return;
      }
      const curSortNumber = currentSortKeyMap[sortKey]
      list = curSortNumber === 0 ? cloneDeep(props.option.data) : list.sort((a: any, b: any) => {
        if (curSortNumber === 1) {
          return b[sortKey] - a[sortKey]
        } else if (curSortNumber === 2) {
          return a[sortKey] - b[sortKey]
        }
      })
    })

    return () => {
      return (
        <div class='table-wrap'>
          <table>
            <thead>
              <th>
                {
                  props.option.config.map((item: { title: string; sortable?: boolean; dataKey: string }) => (
                    <td key={item.dataKey} class='table-th-td'>
                      {item.title}
                      {
                        item.sortable &&
                        <span
                          class={`table-th-td__sort-btn status--${currentSortKeyMap[item.dataKey]}`}
                          onClick={() => toggleSort(item.dataKey)}>{'>'}</span>
                      }
                    </td>
                  ))
                }
              </th>
            </thead>
            <tbody>
              {
                list.map((item: any) => (
                  <tr key={item.id}>
                    {
                      props.option.config.map((configItem: { dataKey: string }) => (
                        <td key={configItem.dataKey}>{item[configItem.dataKey]}</td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>

          <pagination total={100} limit={10} />
        </div>
      );
    };
  },
});
