import type { TableProps as AntdTableProps } from 'ant-design-vue'

export type ColumnItem = {
  title: string
  dataIndex: string
  render?: any
  format?: 'money' | string
  options?: any[]
  tableProps?: Object
}

export type OptionItem = {
  label: string
  value: any
}

export type TableField = Record<string, any> & {
  type: 'search' | 'select' | 'date' | string
  label: string
  placeholder?: string
  key: string
}

export type Schema = {
  title: string
  form: {
    search: boolean
    export: boolean
    fields: TableField[]
  }
  tabs: { title: string; key: string; columns: ColumnItem[] }[]
  options?: Record<
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
  request: (data: any) => any
}
