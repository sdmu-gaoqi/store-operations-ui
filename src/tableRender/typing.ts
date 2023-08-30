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

export type Schame = {
  title: string
  form: {
    search: boolean
    export: boolean
    fields: []
  }
  tabs: { title: string; key: string; columns: ColumnItem[] }[]
}

export interface TableProps {
  schame: Schame
}
