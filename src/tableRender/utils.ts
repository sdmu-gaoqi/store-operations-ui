import { cloneDeep } from 'wa-utils'
import type { ColumnItem, OptionItem } from './typing'
// @ts-ignore
import dayjs from 'dayjs'
import { formatMoney } from '@/utils'

interface FormatParams {
  columns: any[]
  options: Record<string, any>
}

export const formatColumn = ({ column, val }: { column: any; val: any }) => {
  if (column.format === 'money') {
    return formatMoney(val.text)
  }
  if (column.format === 'time') {
    return val.text ? dayjs(val.text).format('YYYY-MM-DD HH:mm:ss') : ''
  }
  if (column.format === 'date') {
    return val.text ? dayjs(val.text).format('YYYY-MM-DD') : ''
  }
  if (column.options) {
    return (
      column.options?.find((item: any) => item.value === val.text)?.label || ''
    )
  }
  if (column.isIndex) {
    return val.index + 1
  }
  return val.text
}

export const formatColumns = ({ columns = [], options = {} }: FormatParams) => {
  const optKeys = Object.keys(options)
  const newColumns = columns.map((item: ColumnItem) => {
    const isEnum = optKeys.includes(item.dataIndex)
    const newItem = cloneDeep(item)
    if (item.format === 'money') {
      newItem.customRender = (val: any) => {
        return formatMoney(val.text)
      }
    }
    if (item.format === 'time') {
      newItem.customRender = (val: any) => {
        return val.text ? dayjs(val.text).format('YYYY-MM-DD HH:mm:ss') : ''
      }
    }
    if (item.format === 'date') {
      newItem.customRender = (val: any) => {
        return val.text ? dayjs(val.text).format('YYYY-MM-DD') : ''
      }
    }
    if (item.options) {
      newItem.customRender = (val: any) => {
        return (
          item.options?.find((item) => item.value === val.text)?.label || ''
        )
      }
    }
    if (item.isIndex) {
      newItem.customRender = (val: any) => {
        return val.index + 1
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
