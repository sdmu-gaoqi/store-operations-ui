<template>
  <ThemeProvider>
    <Card
      :title="props.title"
      :class="`shadow op-ui-form-card ${props.className}`"
    >
      <!-- <Spin :spinning="$props.loading" :style="{ height: '100%' }"> -->
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
        class="mt-[50px] op-ui-form-card-footer flex justify-center items-center py-[10px] bg-[#f5f5f5]"
      >
        <Button
          v-if="props?.footer?.cancel"
          type="primary"
          :ghost="true"
          class="mr-[50px] w-[120px]"
          @click="onCancel"
          >{{
            typeof props?.footer?.cancel === 'string'
              ? props.footer?.cancel
              : '取消'
          }}</Button
        >
        <Button
          v-if="props?.footer?.submit"
          type="primary"
          class="w-[120px]"
          :loading="props?.submitLoading"
          @click="onSubmit"
          >{{
            typeof props?.footer?.submit === 'string'
              ? props.footer?.submit
              : '确认'
          }}</Button
        >
      </div>
      <!-- </Spin> -->
    </Card>
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { isEmpty } from 'wa-utils'
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { Button, Card } from 'ant-design-vue'

const slot = defineSlots()
export interface FormCardProps {
  title: string
  desc?: string
  hiddenDesc?: boolean
  footer?: {
    cancel: boolean | string
    submit: boolean | string
  }
  onCancel?: () => void
  onSubmit?: () => void
  loading?: boolean
  className?: string
  submitLoading?: boolean
}
const props = defineProps<FormCardProps>()
const onCancel = () => {
  if (props.onCancel) {
    props.onCancel()
  }
}
const onSubmit = () => {
  if (props.onSubmit) {
    props.onSubmit()
  }
}
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
