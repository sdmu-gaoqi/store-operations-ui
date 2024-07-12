export type SchemaType =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | 'block'
  | 'upload'
  | 'uploadMultiple'
  | string

export interface SchemaBase {
  type?: SchemaType
  title?: string
  description?: string
  descType?: 'text' | 'icon'
  format?:
    | 'image'
    | 'textarea'
    | 'color'
    | 'email'
    | 'url'
    | 'dateTime'
    | 'date'
    | 'time'
    | 'upload'
    | (string & {})
  default?: any
  /** 是否必填，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  required?: boolean | string
  placeholder?: string
  bind?: false | string | string[]
  dependencies?: string[]
  /** 最小值，支持表达式 */
  min?: number | string
  /** 最大值，支持表达式 */
  max?: number | string
  /** 是否禁用，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  disabled?: boolean | string
  /** 是否只读，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  readOnly?: boolean | string
  /** 是否隐藏，隐藏的字段不会在 formData 里透出，支持 `'{{ formData.xxx === "" }}'` 形式的表达式 */
  hidden?: boolean | string
  displayType?: 'row' | 'column' | string
  width?: string | number
  labelWidth?: number | string
  maxWidth?: number | string
  column?: number
  className?: string
  widget?: string
  colClass?: string
  readOnlyWidget?: string
  extra?: string
  properties?: Record<string, Schema>
  items?: Schema
  /** 多选，支持表达式 */
  enum?: Array<string | number> | string
  /** 多选label，支持表达式 */
  enumNames?: Array<string | number> | string
  rules?: any
  props?: Record<string, any>
  uploadProps?: {
    max?: number
    uploadText?: string
    accept?: string
  }
  /**扩展字段 */
  'add-widget'?: string
  labelCol?: number | any
  fieldCol?: number | any
  tooltip?: string | any
  cellSpan?: number
  span?: number
  validateTrigger?: string | string[]
  [key: string]: any
  footer?: {
    submit?: boolean | string
    reset?: boolean | string
    cancel?: boolean | string
  }
  'ui:hidden'?: boolean | string
  search?: {
    key?: string // 搜索的key
    label?: string // label字段,
    value?: string // value字段
    request: any // 请求
    dataKey: string // 渲染的data
    format?: any
    params?: Record<string, any>
    defaultValue: any
  }
}
export type Schema = Partial<SchemaBase>

export type FormRenderProps = {
  schema: Schema
  onFinish?: (value: Record<string, any>) => void
  finishBefore?: any
  onCancel?: () => void
  onFieldsChanged?: (
    value: Record<string, any>,
    data: { preState: any; nextState: any }
  ) => void
  onFieldChange?: (key: any, value: any) => void
  loading?: boolean
  className?: string
  bodyClassName?: string
  rowClassName?: string
}
