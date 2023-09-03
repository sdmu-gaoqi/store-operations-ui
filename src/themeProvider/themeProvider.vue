<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#585eaa',
        colorTextBase: '#6a6d82',
        colorBgBase: '#fff',
        borderRadius: 20
      }
    }"
    ><solt.default></solt.default
  ></ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
const solt = defineSlots()
console.log(solt, 'solt')
</script>
