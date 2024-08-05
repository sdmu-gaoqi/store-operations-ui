export { default as Input } from './waInput/waInput'
export { default as Test } from './test/test'
export { default as Login } from './login/login.vue'
export { default as TableRender } from './tableRender/tableRender.vue'
export { default as FormRender } from './formRender/formRender.vue'
export { default as FormCard } from './formRender/formCard.vue'
export type { Schema, FormRenderProps } from './formRender/type'
export type { FormCardProps } from './formRender/formCard.vue'
export type { TableProps } from './tableRender/typing'
import 'ant-design-vue/dist/reset.css'
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

export let themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#6102fd',
    colorTextBase: '#6a6d82',
    colorBgBase: '#fff'
  }
}

export const changeTheme = (data: ThemeConfig) => {
  themeConfig = data
}
