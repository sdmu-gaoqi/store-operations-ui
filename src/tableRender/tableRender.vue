<template>
  <ThemeProvider>
    <Card :title="realSchema?.title" :class="joinCss('soui', ['tabs'])">
      <TableFormRender
        :options="schema && schema.options"
        :form="schema && schema.form"
      >
        <template #formButton><slot.formButton></slot.formButton></template
      ></TableFormRender>
      <Tabs
        v-model:activeKey="activeKey"
        type="card"
        v-if="realTabs.length > 1"
        :on-change="changeTab"
      >
        <TabPane v-for="i in realTabs" :key="i.key" :tab="i.title">
          <Table
            :columns="i.columns"
            :scroll="
              tableProps && tableProps.scroll
                ? tableProps.scroll
                : { x: 2000, y: '80vh' }
            "
            :dataSource="dataSource"
            :bordered="true"
          >
            <slot.default v-if="slot.default"></slot.default>
            <template #title v-if="slot.title"><slot.title /></template>
            <template #footer v-if="slot.footer"><slot.footer /></template>
          </Table>
        </TabPane>
      </Tabs>
      <Table
        :columns="realTabs[0].columns"
        v-if="Number(realTabs.length) <= 1"
        :scroll="
          tableProps && tableProps.scroll
            ? tableProps.scroll
            : { x: 2000, y: '80vh' }
        "
        :dataSource="dataSource"
        :bordered="true"
      >
        <template #bodyCell="data" v-if="slot.bodyCell">
          <slot.bodyCell :data="data"></slot.bodyCell>
        </template>
        <template #title v-if="slot.title"><slot.title /></template>
        <template #footer v-if="slot.footer"><slot.footer /></template>
      </Table>
    </Card>
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, toRefs } from 'vue'
import {
  schema as defaultSchema,
  dataSource as defaultDataSource
} from './templete'
import { Card, Tabs, TabPane, Table, Button } from 'ant-design-vue'
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { joinCss } from 'wa-utils'
import { formatColumns } from './utils'
import TableFormRender from '../tableFormRender/tableFormRender.vue'

const slot = defineSlots()

console.log(slot, 'slot')

const props = defineProps({
  schema: Object,
  tableProps: Object,
  changeTab: Function
})
const { schema, tableProps } = toRefs(props)
const realSchema = schema?.value ? schema : toRef(defaultSchema)
const activeKey = ref(realSchema.value?.tabs?.[0]?.key)
const dataSource = ref(defaultDataSource)
const realTabs = computed(() => {
  return realSchema.value?.tabs.map((item: any) => ({
    ...item,
    columns: formatColumns({
      columns: item.columns,
      options: realSchema.value?.options
    })
  }))
})
const changeTab = (value: any) => {
  if (props.changeTab) {
    props.changeTab(value)
  }
}
</script>

<style lang="scss">
.soui-tabs {
  .ant-tabs-tab.ant-tabs-tab-active {
    @apply bg-primary;
    .ant-tabs-tab-btn {
      color: #fff;
    }
  }
}
</style>
