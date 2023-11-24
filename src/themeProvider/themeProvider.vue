<template>
  <ConfigProvider
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#6102fd',
        colorTextBase: '#6a6d82',
        colorBgBase: '#fff'
      }
    }"
    ><solt.default></solt.default
  ></ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
const solt = defineSlots()

// @ts-ignore
zhCN.DatePicker.lang = {
  ...zhCN.DatePicker?.lang,
  monthFormat: 'M月',
  shortWeekDays: ['日', '一', '二', '三', '四', '五', '六']
}
</script>
