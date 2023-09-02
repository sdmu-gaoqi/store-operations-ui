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
  >
    <Form
      class="op-ui-form-render"
      :model="formState"
      autocomplete="off"
      name="basic"
      ref="formRef"
      :rules="schema.rules"
    >
      <div class="op-ui-form-render-body">
        <div class="wa-form-render">
          <Row class="w-[100%]">
            <template v-if="schema" v-for="[key, item] in schemaProperties">
              <Col :span="24 / column">
                <Form.Item
                  :class="joinCss('wa-form-render', ['row'])"
                  :extra="item.extra || ''"
                  :name="key"
                >
                  <template #label>
                    <span>{{ item.title || '' }}</span>
                    <a-tooltip v-if="item.tooltip" :title="item.tooltip.title">
                      <QuestionCircleOutlined class="ml-[5px]" />
                    </a-tooltip>
                  </template>
                  <Input
                    :style="item?.props?.style || {}"
                    v-if="item.type === 'string' && item.widget === 'input'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :maxlength="item?.props?.maxLength || undefined"
                    :type="item?.props?.type ?? 'text'"
                  />
                  <InputNumber
                    :style="item?.props?.style || { width: '100%' }"
                    v-if="item.type === 'number' && item.widget === 'input'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :maxlength="item?.props?.maxLength || undefined"
                    :type="item?.props?.type ?? 'text'"
                    :max="item?.props?.max || undefined"
                  ></InputNumber>
                  <Select
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item?.props?.options || []"
                    :style="item?.props?.style || {}"
                    v-if="['select'].includes(item?.widget || '')"
                    v-model:value="formState[key]"
                  ></Select>
                  <Select
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item?.props?.options || []"
                    mode="multiple"
                    :style="item?.props?.style || {}"
                    v-if="['multiSelect'].includes(item?.widget || '')"
                    v-model:value="formState[key]"
                  ></Select>
                  <Input.TextArea
                    v-if="item.widget === 'textArea'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                  ></Input.TextArea>
                  <RadioGroup
                    v-if="item.widget === 'radio'"
                    v-model:value="formState[key]"
                  >
                    <Radio
                      :value="radioItem?.value"
                      :style="item?.props?.style || {}"
                      v-for="radioItem in item.props?.options"
                      >{{ radioItem?.label }}</Radio
                    ></RadioGroup
                  >
                  <DatePicker
                    v-if="
                      ['datePicker', 'timePicker'].includes(
                        item.widget || ''
                      ) && item.type === 'string'
                    "
                    :placeholder="item?.props?.placeholder || ''"
                    :showTime="item?.props?.showTime"
                    :style="item?.props?.style || { width: '50%' }"
                    v-model:value="formState[key]"
                    :format="
                      getFormat(
                        item?.picker || item?.format,
                        item.props?.showTime,
                        item.props?.showSecond ?? true
                      )
                    "
                    :value-format="
                      getFormat(
                        item?.picker || item?.format,
                        item.props?.showTime,
                        item.props?.showSecond ?? true
                      )
                    "
                    :picker="item?.picker || item?.format || 'date'"
                    :showNow="item?.props?.showNow || false"
                  ></DatePicker>
                  <RangePicker
                    v-if="
                      ['dateRange', 'timeRange'].includes(item.widget || '') &&
                      item.type === 'range'
                    "
                    :style="item?.props?.style || { width: '50%' }"
                    :placeholder="
                      item?.props?.placeholder || ['开始时间', '结束时间']
                    "
                    :showTime="item?.props?.showTime"
                    v-model:value="formState[key]"
                    :picker="item?.picker || item?.format || 'date'"
                    :showNow="item?.props?.showNow"
                    :format="
                      getFormat(
                        item?.picker || item?.format,
                        item.props?.showTime,
                        item.props?.showSecond ?? true
                      )
                    "
                    :value-format="
                      getFormat(
                        item.props?.picker || item.props?.format,
                        item.props?.showTime,
                        item.props?.showSecond ?? true
                      )
                    "
                  ></RangePicker>
                  <Switch
                    v-if="item.widget === 'switch'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:checked="formState[key]"
                    :style="item?.props?.style || {}"
                  >
                  </Switch>
                  <CheckboxGroup
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item.props?.options"
                    v-if="item?.widget === 'checkboxes'"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                  ></CheckboxGroup>
                  <Rate
                    v-if="item.widget === 'rate'"
                    :count="item.props?.count || 5"
                    :allowClear="item.props?.allowClear || true"
                    :allowHalf="item.props?.allowHalf || false"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                  ></Rate>
                </Form.Item>
              </Col>
            </template>
          </Row>
        </div>
      </div>
      <div
        class="wa-form-footer flex-shrink-0 h-[60px] flex justify-end items-center px-[50px] bg-[#f5f5f5] bottom-0"
      >
        <Button
          v-if="footerOptions?.cancel"
          :ghost="true"
          type="primary"
          class="ml-[20px] w-[120px]"
          @click="cancel"
          >取消</Button
        >
        <Button
          v-if="footerOptions?.reset"
          :ghost="true"
          type="primary"
          class="ml-[20px] w-[120px]"
          @click="resetForm"
          >重置</Button
        >
        <Button
          v-if="footerOptions?.submit"
          class="ml-[20px] w-[120px]"
          type="primary"
          @click="onSubmit"
          >提交</Button
        >
      </div>
    </Form>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw, toRef } from 'vue'
import { joinCss } from 'wa-utils'
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  InputNumber,
  Radio,
  DatePicker,
  RangePicker,
  Button,
  Switch,
  CheckboxGroup,
  RadioGroup,
  Rate,
  ConfigProvider
} from 'ant-design-vue'
import { FormRenderProps } from './type'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps<FormRenderProps>()
const schema = toRef(props, 'schema')
const column = computed(() => {
  const formColumn = +(schema?.value?.column || 1)
  return formColumn
})
const formState = ref<Record<string, any>>({})
const formRef = ref()
const schemaProperties = Object.entries(schema?.value?.properties || {})
schemaProperties.forEach(([key, value]) => {
  formState.value[key] = value?.defaultValue || undefined
})
const footerOptions = computed(() => {
  return {
    submit: schema?.value?.footer?.submit ?? true,
    reset: schema?.value?.footer?.reset ?? false,
    cancel: schema?.value?.footer?.cancel ?? true
  }
})

const getFormat = (
  type: 'date' | 'week' | 'month' | 'quarter' | 'year' | string,
  showTime: boolean,
  showSecond?: boolean
) => {
  switch (type) {
    case 'date':
      return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    case 'week':
      return 'YYYY第W周'
    case 'month':
      return 'YYYY-MM'
    case 'quarter':
      return 'YYYY年Q季度'
    case 'year':
      return 'YYYY'
    case 'time':
      return showSecond ? 'HH:mm:ss' : 'HH:mm'
    default:
      return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
}
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      if (props.onFinish) {
        props.onFinish(toRaw(formState.value))
      }
    })
    .catch((error: any) => {
      console.log(error)
      formRef.value.scrollToField('code')
    })
}
const resetForm = () => {
  formRef.value.resetFields()
}
const cancel = () => {
  if (props.onCancel) {
    props.onCancel()
  }
}
</script>

<style lang="scss">
.op-ui-form-render {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &-body {
    overflow: hidden auto;
    padding-top: 20px;
  }
}
.wa-form-render {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 26px;
  &-row {
    margin-bottom: 30px;
    padding: 0 10px;
  }
  .ant-form-item-label {
    width: 120px;
    padding-right: 20px;
  }
}
</style>
