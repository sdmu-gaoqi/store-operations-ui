<template>
  <ThemeProvider>
    <Form
      class="op-ui-form-render"
      :model="formState"
      autocomplete="off"
      name="basic"
      ref="formRef"
      :rules="schema.rules"
    >
      <div class="op-ui-form-render-body">
        <div
          class="wa-form-render"
          :style="{ width: props.schema.width || 'auto', margin: 'auto' }"
        >
          <Row class="w-[100%]">
            <template v-if="schema" v-for="[key, item] in schemaProperties">
              <Col v-if="!key.startsWith('op-group')" :span="24 / column">
                <Form.Item
                  :class="joinCss('wa-form-render', ['row'])"
                  :extra="item.extra || ''"
                  :name="key"
                >
                  <template #label>
                    <span>{{ item.title || '' }}</span>
                    <Tooltip v-if="item.tooltip" :title="item.tooltip.title">
                      <QuestionCircleOutlined class="ml-[5px]" />
                    </Tooltip>
                  </template>
                  <Input
                    :style="item?.props?.style || {}"
                    v-if="item.type === 'string' && item.widget === 'input'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :maxlength="item?.props?.maxLength || undefined"
                    :type="item?.props?.type ?? 'text'"
                    :disabled="item.props?.disabled"
                    :readonly="item.props?.readonly ?? false"
                    :bordered="item.props?.bordered ?? true"
                  >
                    <template v-if="item.props?.suffix" #suffix>
                      <span>{{ renderSuffix(item.props?.suffix) }}</span>
                    </template></Input
                  >
                  <InputNumber
                    :style="item?.props?.style || { width: '100%' }"
                    v-if="item.type === 'number' && item.widget === 'input'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :maxlength="item?.props?.maxLength || undefined"
                    :type="item?.props?.type ?? 'text'"
                    :max="item?.props?.max || undefined"
                    :disabled="item.props?.disabled"
                  >
                    <template v-if="item.props?.suffix" #addonAfter>
                      <span>{{ renderSuffix(item.props?.suffix) }}</span>
                    </template></InputNumber
                  >
                  <Select
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item?.props?.options || []"
                    :style="item?.props?.style || {}"
                    v-if="['select'].includes(item?.widget || '')"
                    v-model:value="formState[key]"
                    :disabled="item.props?.disabled"
                    :allow-clear="true"
                    :show-search="true"
                  ></Select>
                  <Select
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item?.props?.options || []"
                    mode="multiple"
                    :style="item?.props?.style || {}"
                    v-if="['multiSelect'].includes(item?.widget || '')"
                    v-model:value="formState[key]"
                    :disabled="item.props?.disabled"
                    :allow-clear="true"
                    :show-search="true"
                  ></Select>
                  <Input.TextArea
                    v-if="item.widget === 'textArea'"
                    :placeholder="item?.props?.placeholder || ''"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                    :disabled="item.props?.disabled"
                  ></Input.TextArea>
                  <RadioGroup
                    v-if="item.widget === 'radio'"
                    v-model:value="formState[key]"
                  >
                    <Radio
                      :value="radioItem?.value"
                      :style="item?.props?.style || {}"
                      v-for="radioItem in item.props?.options"
                      :disabled="item.props?.disabled"
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
                    :disabled="item.props?.disabled"
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
                    :disabled="item.props?.disabled"
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
                    :disabled="item.props?.disabled"
                  >
                  </Switch>
                  <CheckboxGroup
                    :placeholder="item?.props?.placeholder || ''"
                    :options="item.props?.options"
                    v-if="item?.widget === 'checkboxes'"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                    :disabled="item.props?.disabled"
                  ></CheckboxGroup>
                  <Rate
                    v-if="item.widget === 'rate'"
                    :count="item.props?.count || 5"
                    :allowClear="item.props?.allowClear || true"
                    :allowHalf="item.props?.allowHalf || false"
                    v-model:value="formState[key]"
                    :style="item?.props?.style || {}"
                    :disabled="item.props?.disabled"
                  ></Rate>
                </Form.Item>
              </Col>
              <Col :span="24" v-if="key.startsWith('op-group')">
                <div class="flex items-center text-[16px] pb-[16px]">
                  <Classify
                    class="fill-primary w-[16px] h-[16px] mr-[10px]"
                  ></Classify>
                  {{ item.title }}
                </div>
              </Col>
            </template>
          </Row>
          <template v-if="slot.after">
            <slot.after></slot.after>
          </template>
        </div>
      </div>
      <div
        class="wa-form-footer flex-shrink-0 h-[60px] flex justify-end items-center px-[50px] bg-[#f5f5f5] bottom-0 w-[100%]"
      >
        <Button
          v-if="footerOptions?.cancel"
          :ghost="true"
          type="primary"
          class="ml-[20px] w-[120px]"
          @click="cancel"
        >
          {{
            typeof footerOptions?.cancel === 'string'
              ? footerOptions.cancel
              : '取消'
          }}</Button
        >
        <Button
          v-if="footerOptions?.reset"
          :ghost="true"
          type="primary"
          class="ml-[20px] w-[120px]"
          @click="resetForm"
        >
          {{
            typeof footerOptions?.reset === 'string'
              ? footerOptions.reset
              : '重置'
          }}</Button
        >
        <Button
          v-if="footerOptions?.submit"
          class="ml-[20px] w-[120px]"
          type="primary"
          @click="onSubmit"
        >
          {{
            typeof footerOptions?.submit === 'string'
              ? footerOptions.submit
              : '提交'
          }}
        </Button>
      </div>
    </Form>
  </ThemeProvider>
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
  Tooltip
} from 'ant-design-vue'
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { FormRenderProps } from './type'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { renderSuffix } from './utils'
import Classify from '@/assets/classify.svg'

const slot = defineSlots()
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
  justify-content: center;
  align-items: center;
  &-body {
    overflow: hidden auto;
    padding-top: 20px;
    flex: 1;
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
