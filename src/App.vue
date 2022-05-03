<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive } from '@vue/reactivity'
import SimpleTable from './components/SimpleTable'

const tableOption = reactive({
  config: [
    {
      title: 'ID',
      dataKey: 'id',
      sortable: true
    },
    {
      title: '姓名',
      dataKey: 'name'
    },
    {
      title: '年龄',
      dataKey: 'age',
      sortable: true
    },
    {
      title: '爱好',
      dataKey: 'hobby'
    }
  ],
  data: [
    {
      id: '1111',
      name: '张三',
      age: '18',
      hobby: '打篮球'
    },
    {
      id: '3333',
      name: '王五',
      age: '26',
      hobby: '打篮球'
    },
    {
      id: '2222',
      name: '李四',
      age: '20',
      hobby: '踢足球'
    }
  ]
})
</script>

<template>
  <simple-table :option="tableOption" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
