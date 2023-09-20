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
        v-on:change="(key) => emit('update:activeKey', key)"
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
            <template #bodyCell="data" v-if="slot.bodyCell">
              <slot.bodyCell :data="data"></slot.bodyCell>
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
import { computed, onMounted, ref, toRef, toRefs } from 'vue'
import {
  schema as defaultSchema,
  dataSource as defaultDataSource
} from './templete'
import { Card, Tabs, TabPane, Table } from 'ant-design-vue'
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { joinCss } from 'wa-utils'
import { formatColumns } from './utils'
import TableFormRender from '../tableFormRender/tableFormRender.vue'
import type { TableProps } from './typing'

const slot = defineSlots()

const emit = defineEmits()

const props = defineProps<TableProps>()
const { onSearch } = props
const { schema, tableProps } = toRefs(props)
const realSchema = schema?.value ? schema : toRef(defaultSchema)
const dataSource = ref(defaultDataSource)
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
}

onMounted(() => {
  if (!props.activeKey && props.schema?.tabs?.length > 1) {
    emit('update:activeKey', props.schema?.tabs?.[0]?.key)
  }
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
