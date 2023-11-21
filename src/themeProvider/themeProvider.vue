<template>
  <ConfigProvider
    :locale="locale"
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
const locale = zhCN
const solt = defineSlots()
</script>
