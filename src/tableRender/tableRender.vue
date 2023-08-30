<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#585eaa'
      }
    }"
  >
    <Card :title="realSchema?.title" :class="joinCss('soui', ['tabs'])">
      <FormRender
        :options="schema && schema.options"
        :form="schema && schema.form"
      >
        <template #formButton><slot.formButton></slot.formButton></template
      ></FormRender>
      <Tabs
        v-model:activeKey="activeKey"
        type="card"
        v-if="realTabs.length > 1"
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
          ></Table>
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
        <template #title><slot.title /></template>
        <template #footer><slot.footer /></template>
      </Table>
    </Card>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, toRefs } from 'vue'
import {
  schema as defaultSchema,
  dataSource as defaultDataSource
} from './templete'
import { Card, Tabs, TabPane, Table, ConfigProvider } from 'ant-design-vue'
import { joinCss } from 'wa-utils'
import { formatColumns } from './utils'
import FormRender from '../formRender/formRender.vue'

const slot = defineSlots()

const props = defineProps({
  schema: Object,
  tableProps: Object
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
