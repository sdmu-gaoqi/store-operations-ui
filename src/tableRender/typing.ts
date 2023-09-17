import type { TableProps as AntdTableProps } from 'ant-design-vue'

export type ColumnItem = {
  title: string
  dataIndex: string
  render: any
  format: 'money' | string
  options: 'detail'[]
  tableProps: Object
}

export type OptionItem = {
  label: string
  value: any
}

export type Schema = {
  title: string
  form: {
    search: boolean
    export: boolean
    fields: []
  }
  tabs: { title: string; key: string; columns: ColumnItem[] }[]
  options: Record<
    string,
    Partial<Record<'label' | 'value' | 'key' | string, any>>
  >
}

export interface TableProps {
  schema: Schema
  tableProps?: AntdTableProps
  changeTab?: (v: string) => void
  activeKey?: string
  onSearch: (data: Record<string, any>) => Promise<void> | void
}
