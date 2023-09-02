<template>
  <Card :title="props.title" class="op-ui-form-card shadow">
    <template #extra
      ><div class="flex items-center">
        <span class="text-red-500">*</span> 为必填项
      </div></template
    >
    <slot.content></slot.content>
  </Card>
</template>

<script lang="ts" setup>
import { Card } from 'ant-design-vue'
const slot = defineSlots()
export interface FormCardProps {
  title: string
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
