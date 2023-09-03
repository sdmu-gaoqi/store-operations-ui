<template>
  <ThemeProvider>
    <Card :title="props.title" class="op-ui-form-card shadow">
      <template v-if="!props.hiddenDesc" #extra
        ><div class="flex items-center">
          <template v-if="isEmpty(props.desc)">
            <span class="text-red-500">*</span> 为必填项
          </template>
          <template v-if="!isEmpty(props.desc)">
            {{ props.desc }}
          </template>
        </div></template
      >
      <slot.content></slot.content>
      <div
        class="mt-[50px] op-ui-form-card-footer flex justify-center items-center"
      >
        <Button
          v-if="props?.footer?.cancel"
          type="primary"
          :ghost="true"
          class="mr-[50px] w-[120px]"
          :on-click="() => debounce(props?.onCancel)"
          >{{
            typeof props?.footer?.cancel === 'string'
              ? props.footer?.cancel
              : '取消'
          }}</Button
        >
        <Button
          v-if="props?.footer?.cancel"
          type="primary"
          class="w-[120px]"
          :on-click="() => debounce(props?.onSubmit)"
          >{{
            typeof props?.footer?.cancel === 'string'
              ? props.footer?.cancel
              : '确认'
          }}</Button
        >
      </div>
    </Card>
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { Card, Button } from 'ant-design-vue'
import { debounce, isEmpty } from 'wa-utils'
import ThemeProvider from '../themeProvider/themeProvider.vue'

const slot = defineSlots()
export interface FormCardProps {
  title: string
  desc: string
  hiddenDesc: boolean
  footer?: {
    cancel: boolean | string
    submit: boolean | string
  }
  onCancel?: () => void
  onSubmit?: () => void
}
const props = defineProps<FormCardProps>()
</script>

<style lang="scss">
.op-ui-form-card {
  height: 100%;
  overflow: hidden;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: none;
  .ant-card-head {
    background-color: #f5f5f5;
    height: 60px;
  }
  .ant-card-body {
    height: calc(100% - 60px);
    padding: 0;
    border-radius: 0;
  }
}
</style>
