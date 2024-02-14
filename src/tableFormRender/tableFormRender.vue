<template>
  <Form class="opui-form" ref="formRef" :model="formState">
    <Row>
      <Col
        v-for="i in fields"
        :key="i.key"
        :class="colClass + ' ' + (i.class || '')"
      >
        <Form.Item :label="i.label" :name="i.key" class="pl-[20px]">
          <Input
            v-if="i.type === 'search'"
            :placeholder="i.placeholder || i.label"
            v-model:value="formState[i.key]"
            class="w-[100%]"
            :allow-clear="true"
          ></Input>
          <DatePicker
            v-if="i.type === 'date'"
            :show-time="i?.format === 'dateTime'"
            :placeholder="i.placeholder || i.label"
            v-model:value="formState[i.key]"
            :locale="locale"
            class="w-[100%]"
            :picker="
              ['week', 'month', 'quarter', 'year'].includes(i?.format)
                ? i?.format
                : undefined
            "
          ></DatePicker>
          <DatePicker.RangePicker
            v-if="i.type === 'range'"
            :placeholder="i.placeholder || i.label"
            :show-time="i?.format === 'dateTime'"
            v-model:value="formState[i.key]"
            class="w-[100%]"
            :locale="locale"
            :picker="
              ['week', 'month', 'quarter', 'year'].includes(i?.format)
                ? i?.format
                : undefined
            "
          ></DatePicker.RangePicker>
          <Select
            v-if="i.type === 'select'"
            :placeholder="i.placeholder || i.label"
            :options="getOptions(i.key)"
            v-model:value="formState[i.key]"
            class="w-[100%]"
            show-search
            :allow-clear="true"
          ></Select>
        </Form.Item>
      </Col>
      <div class="pl-[60px] ml-auto">
        <Button
          v-if="form && form.search"
          class="opui-form-button bg-primary"
          type="primary"
          v-on:click="onFinish"
          >查询</Button
        >
        <Button
          v-if="form && form.reset"
          class="opui-form-button"
          v-on:click="onReset"
          >重置</Button
        >
        <Button
          v-if="form && form.export"
          class="opui-form-button bg-primary"
          type="primary"
          v-on:click="onExport"
          >导出</Button
        >
        <slot name="formButton"></slot>
      </div>
    </Row>
  </Form>
</template>

<script lang="ts" setup>
import { toRef, toRefs, ref, reactive, watch } from 'vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select
} from 'ant-design-vue'

const colClass = 'w-[360px]'

const formRef = ref()

const props = defineProps({
  form: Object,
  options: Object,
  submit: Function,
  handleExport: Function,
  activeKey: String
})

interface FormState {
  [key: string]: any
}

let formState = reactive<FormState>({})

const { form, options } = toRefs(props)
const { submit, handleExport } = props

const fields = toRef(form!.value!.fields)

watch(
  () => props.activeKey,
  () => {
    const curFields = form!.value!.fields?.filter(
      (item: any) => !item?.activeKey || item?.activeKey == props.activeKey
    )
    const hasTabKeys = fields.value
      ?.filter((item: any) => item?.activeKey)
      ?.map((item: any) => {
        return item?.names ? item.names : item?.key
      })
      ?.flat()
    formRef.value.resetFields(hasTabKeys)
    fields.value = curFields
  }
)

const getOptions = (key: string) => {
  if (!options?.value) {
    return []
  } else if (options.value) {
    const target = options?.value?.[key]
    if (target) {
      return [{ label: '全部', value: '' }, ...target]
    }
    return []
  }
}

const getFormValue = async () => {
  const value: Record<string, any> = {}
  const res = await formRef.value.validate()
  for (let k in res) {
    const field = props.form?.fields?.find((item: any) => item.key === k)
    const keys = [
      field?.names?.[0] || field?.key,
      field?.names?.[1] || field?.key
    ]
    const target = fields.value.find((item: any) => item.key === k)
    if (target && target.type && res[k]) {
      if (target.type === 'date') {
        let dateFormat = 'YYYY-MM-DD'
        if (target?.format === 'timestamp') {
          value[k] = +new Date(res[k])
        } else if (target?.format === 'month') {
          dateFormat = 'YYYY-MM'
        } else if (target?.format === 'year') {
          dateFormat = 'YYYY'
        } else if (target?.format === 'dateTime') {
          dateFormat = 'YYYY-MM-DD HH:mm:ss'
        }
        value[k] = res[k]?.format(dateFormat)
      } else if (target.type === 'range') {
        let dateFormat = 'YYYY-MM-DD'
        if (target?.format === 'timestamp') {
          const date1 = new Date(res[k]?.[0])
          date1.setHours(0)
          date1.setMinutes(0)
          date1.setSeconds(0)
          const date2 = new Date(res[k]?.[1])
          date2.setHours(23)
          date2.setMinutes(59)
          date2.setSeconds(59)
          value[keys?.[0]] = +date1
          value[keys?.[1]] = +date2
        } else if (target?.format === 'month') {
          dateFormat === 'YYYY-MM'
        } else if (target?.format === 'year') {
          dateFormat = 'YYYY'
        } else if (target?.format === 'dateTime') {
          dateFormat = 'YYYY-MM-DD HH:mm:ss'
        }
        ;(value[k] = res[k]?.filter((item: any) => item)).map(
          (v: any) => v?.format(dateFormat)
        )
      } else {
        value[k] = res[k]
      }
    } else {
      value[k] = res[k]
    }
  }
  return value
}

const onFinish = async () => {
  const value = await getFormValue()
  if (submit) {
    submit(value)
  }
}

const onReset = () => {
  formRef.value.resetFields()
  if (submit) {
    submit({}, { reset: true })
  }
}

const onExport = async () => {
  const value = await getFormValue()
  if (handleExport) {
    handleExport(value)
  }
}
</script>

<style lang="scss">
.opui-form {
  margin-bottom: 20px;
  .ant-form-item-label {
    width: 90px;
  }
}
.opui-form-button {
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
}
</style>
