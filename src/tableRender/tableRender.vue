<template>
  <ThemeProvider>
    <Card :title="realSchema?.title" :class="joinCss('soui', ['tabs'])">
      <TableFormRender
        :options="schema && schema.options"
        :form="schema && schema.form"
        :submit="formChange"
      >
        <template #formButton><slot.formButton></slot.formButton></template
      ></TableFormRender>
      <Tabs
        type="card"
        v-if="realTabs.length > 1"
        :active-key="props.activeKey"
        v-on:change="
          (key) => {
            emit('update:activeKey', key)
            changeTab(key)
          }
        "
      >
        <TabPane v-for="i in realTabs" :key="i.key" :tab="i.title">
          <Table
            :columns="i.columns"
            :scroll="
              tableProps && tableProps.scroll
                ? tableProps.scroll
                : { x: 2000, y: '80vh' }
            "
            :dataSource="list ? list : listData?.rows"
            :bordered="true"
            :loading="loading"
            :on-change="changePage"
            :pagination="
              tableProps?.pagination ?? {
                current: listData?.current,
                pageSize: listData?.pageSize,
                total: listData?.total,
                showTotal: (total) => `共${total}条`
              }
            "
          >
            <slot.default v-if="slot.default"></slot.default>
            <template #bodyCell="data" v-if="slot.bodyCell">
              <slot.bodyCell
                :data="{
                  ...data,
                  customer: formatColumn({ column: data.column, val: data })
                }"
              ></slot.bodyCell>
            </template>
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
        :dataSource="list ? list : listData?.rows"
        :bordered="true"
        :loading="loading"
        :on-change="changePage"
        :pagination="
          tableProps?.pagination ?? {
            current: listData?.current,
            pageSize: listData?.pageSize,
            total: listData?.total,
            showTotal: (total) => `共${total}条`
          }
        "
      >
        <template #bodyCell="data" v-if="slot.bodyCell">
          <slot.bodyCell
            :data="{
              ...data,
              customer: formatColumn({ column: data.column, val: data })
            }"
          ></slot.bodyCell>
        </template>
        <template #title v-if="slot.title"><slot.title /></template>
        <template #footer v-if="slot.footer"><slot.footer /></template>
      </Table>
    </Card>
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { computed, onMounted, toRaw, toRef, toRefs } from 'vue'
import { schema as defaultSchema } from './templete'
import {
  Card,
  Tabs,
  TabPane,
  Table,
  TablePaginationConfig
} from 'ant-design-vue'
// @ts-ignore
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { joinCss } from 'wa-utils'
import { formatColumns, formatColumn } from './utils'
// @ts-ignore
import TableFormRender from '../tableFormRender/tableFormRender.vue'
import type { TableProps } from './typing'
import { useRequest } from 'vue-hooks-plus'
import type { CommonResponse, ListResponse } from 'store-request'

const slot = defineSlots()

const emit = defineEmits()

const props = defineProps({
  schema: Object,
  tableProps: Object,
  changeTab: Function,
  activeKey: String,
  onSearch: Function,
  request: Function,
  list: Array,
  formatParams: Function
}) as TableProps
const { onSearch = () => {} } = props

const { schema, tableProps, list } = toRefs(props)

const {
  run,
  loading,
  data: listData,
  params
} = useRequest<CommonResponse<ListResponse>>((p: any) =>
  props
    .request({
      ...(props.schema?.tabKey && {
        [props.schema?.tabKey]: props?.schema?.tabs?.[0]?.key
      }),
      ...(p || {})
    })
    .then((res) => {
      const p: any = {
        current: (toRaw(params.value)?.[0] as any)?.pageNum || 1,
        pageSize: (toRaw(params.value)?.[0] as any)?.pageSize || 10
      }
      return {
        ...res,
        ...p
      }
    })
)

const realSchema = schema?.value ? schema : toRef(defaultSchema)
const realTabs = computed(() => {
  return realSchema.value?.tabs.map((item: any) => ({
    ...item,
    columns: formatColumns({
      columns: item.columns,
      options: realSchema.value?.options || []
    })
  }))
})

const formChange = (value: Parameters<typeof onSearch>[0]) => {
  if (onSearch) {
    onSearch(value)
  }
  const params = props.formatParams ? props.formatParams(value) : value
  run({
    ...params
  })
}

const changePage = (value: TablePaginationConfig) => {
  if (!listData.value?.rows) {
    return
  }
  const lastParam = params?.value ? (params?.value?.[0] as {}) : {}
  run({
    ...lastParam,
    pageNum: value.current,
    pageSize: value.pageSize
  })
}

const changeTab = (v: any) => {
  const lastParam = params?.value ? (params?.value?.[0] as {}) : {}
  run({
    ...lastParam,
    pageNum: 1,
    [props?.schema?.tabKey || 'tab']: v
  })
}

onMounted(() => {
  if (!props.activeKey && props.schema?.tabs?.length > 1) {
    emit('update:activeKey', props.schema?.tabs?.[0]?.key)
  }
})

defineExpose({
  run,
  params
})
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
