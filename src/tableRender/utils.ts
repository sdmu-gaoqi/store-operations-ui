import { cloneDeep, toThousands } from 'wa-utils'
import type { ColumnItem, OptionItem } from './typing'

interface FormatParams {
  columns: any[]
  options: Record<string, any>
}

export const formatColumns = ({ columns = [], options = {} }: FormatParams) => {
  const optKeys = Object.keys(options)
  const newColumns = columns.map((item: ColumnItem) => {
    const isEnum = optKeys.includes(item.dataIndex)
    const newItem = cloneDeep(item)
    if (item.format === 'money') {
      newItem.customRender = (val: any) => {
        return toThousands(val.text)
      }
    }
    return {
      align: 'center',
      ...newItem,
      ...(isEnum && {
        customRender: (val: any) => {
          const active: OptionItem = options[item.dataIndex].find(
            (optItem: OptionItem) => optItem.value === val.text
          )!
          if (active) {
            return active?.label
          }
          return val.text
        }
      })
    }
  })
  return newColumns
}
