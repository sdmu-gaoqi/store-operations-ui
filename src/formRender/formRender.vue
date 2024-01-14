<template>
  <ThemeProvider>
    <Spin :spinning="props.loading" wrapperClassName="spin-wrapper">
      <Form
        :class="`op-ui-form-render ${props.className}`"
        :model="formState"
        autocomplete="off"
        name="basic"
        ref="formRef"
        :rules="schema.rules"
      >
        <div class="op-ui-form-render-body">
          <div
            :class="`wa-form-render ${props.bodyClassName}`"
            :style="{ width: props.schema.width || 'auto', margin: 'auto' }"
          >
            <template v-if="slot.left">
              <slot.left></slot.left>
            </template>
            <Row :class="`w-[100%] ${props.rowClassName}`" v-if="schema">
              <template v-for="([key, item], sIndex) in schemaProperties">
                <Col
                  v-if="
                    !key.startsWith('op-group') &&
                    !key.startsWith('op-desc') &&
                    uiShowHidden(item)
                  "
                  :span="
                    item?.span || typeof item.span == 'number'
                      ? item.span
                      : 24 / column
                  "
                  v-bind:key="sIndex"
                  :class="item?.colClass"
                  :style="{
                    ...(item?.colStyle || {}),
                    ...(!uiShowHidden(item) && {
                      height: 0,
                      overflow: 'hidden'
                    }),
                    ...(key?.includes('占位') && {
                      height: 0
                    })
                  }"
                >
                  <Form.Item
                    :class="joinCss('wa-form-render', ['row'])"
                    :extra="item.extra || ''"
                    :name="key"
                    :style="{
                      ...(!uiShowHidden(item) && {
                        height: 0,
                        margin: 0,
                        overflow: 'hidden'
                      })
                    }"
                  >
                    <template #label v-if="item.title">
                      <span :class="item.labelClass">{{
                        item.title || ''
                      }}</span>
                      <Tooltip v-if="item.tooltip" :title="item.tooltip.title">
                        <QuestionCircleOutlined class="ml-[5px]" />
                      </Tooltip>
                    </template>
                    <!-- :options="
                      isEmpty(searchOptions?.[key])
                        ? item?.props?.options || []
                        : searchOptions?.[key]
                    " -->
                    <TreeSelect
                      v-if="item.widget === 'treeSelect'"
                      :allow-clear="item?.props?.allowClear || true"
                      :tree-default-expand-all="
                        item?.props?.treeDefaultExpandAll || false
                      "
                      :tree-data="item?.props?.treeData"
                      :field-names="item?.props?.fieldNames"
                      :placeholder="item?.props?.placeholder"
                      :title="item?.props?.title"
                      :label-in-value="item?.props?.labelInValue"
                      :multiple="item?.props?.multiple"
                      v-model:value="formState[key]"
                    />
                    <Select
                      v-if="item.widget === 'searchSelect'"
                      :filter-option="false"
                      :options="
                        isEmpty(searchOptions?.[key])
                          ? item?.props?.options || []
                          : item?.search?.format
                          ? item?.search?.format(
                              toRaw(getOptions(searchOptions?.[key], item))
                            )
                          : getOptions(searchOptions?.[key], item)
                      "
                      @search="(v) => selectSearch(v, item, key)"
                      :placeholder="item?.placeholder || '请选择'"
                      :mode="item?.props?.mode"
                      :show-search="true"
                      :label-in-value="true"
                      :field-names="{
                        label: item?.search?.label,
                        value: item?.search?.value
                      }"
                      v-model:value="formState[`${key}-search`]"
                      @change="
                        (v, r) => {
                          formState[key] = r
                          props.onFieldChange && props.onFieldChange(key, v)
                        }
                      "
                    ></Select>
                    <Input
                      :style="item?.props?.style || {}"
                      v-if="
                        item.type === 'string' &&
                        item.widget === 'input' &&
                        !item?.props?.options
                      "
                      :placeholder="item?.props?.placeholder || ''"
                      v-model:value="formState[key]"
                      :maxlength="item?.props?.maxLength || undefined"
                      :type="item?.props?.type ?? 'text'"
                      :disabled="item.props?.disabled"
                      :readonly="item.props?.readonly ?? false"
                      :bordered="item.props?.bordered ?? true"
                      :max="item?.props?.max || undefined"
                      :min="item?.props?.max || undefined"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    >
                      <template v-if="item.props?.suffix" #suffix>
                        <span>{{ renderSuffix(item.props?.suffix) }}</span>
                      </template></Input
                    >
                    <AutoComplete
                      :style="item?.props?.style || {}"
                      v-if="
                        item.type === 'string' &&
                        item.widget === 'input' &&
                        item?.props?.options
                      "
                      :placeholder="item?.props?.placeholder || ''"
                      v-model:value="formState[key]"
                      :maxlength="item?.props?.maxLength || undefined"
                      :type="item?.props?.type ?? 'text'"
                      :disabled="item.props?.disabled"
                      :readonly="item.props?.readonly ?? false"
                      :bordered="item.props?.bordered ?? true"
                      :options="item?.props?.options"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    ></AutoComplete>
                    <InputNumber
                      :style="item?.props?.style || { width: '100%' }"
                      v-if="item.type === 'number' && item.widget === 'input'"
                      :placeholder="item?.props?.placeholder || ''"
                      v-model:value="formState[key]"
                      :maxlength="item?.props?.maxLength || undefined"
                      :type="item?.props?.type ?? 'text'"
                      :max="item?.props?.max || undefined"
                      :min="item?.props?.min ?? undefined"
                      :disabled="item.props?.disabled"
                      :precision="item.props?.precision ?? 2"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
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
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
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
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    ></Select>
                    <Input.TextArea
                      v-if="item.widget === 'textArea'"
                      :placeholder="item?.props?.placeholder || ''"
                      v-model:value="formState[key]"
                      :style="item?.props?.style || {}"
                      :disabled="item.props?.disabled"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    ></Input.TextArea>
                    <RadioGroup
                      v-if="item.widget === 'radio'"
                      v-model:value="formState[key]"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    >
                      <Radio
                        :value="radioItem?.value"
                        :style="item?.props?.style || {}"
                        v-bind:key="radioIndex"
                        v-for="(radioItem, radioIndex) in item.props?.options"
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
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
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
                      :locale="locale"
                    ></DatePicker>
                    <RangePicker
                      v-if="
                        ['dateRange', 'timeRange'].includes(
                          item.widget || ''
                        ) && item.type === 'range'
                      "
                      :style="item?.props?.style || { width: '50%' }"
                      :placeholder="
                        item?.props?.placeholder || ['开始时间', '结束时间']
                      "
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
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
                      :locale="locale"
                    ></RangePicker>
                    <Switch
                      v-if="item.widget === 'switch'"
                      :placeholder="item?.props?.placeholder || ''"
                      v-model:checked="formState[key]"
                      :style="item?.props?.style || {}"
                      :disabled="item.props?.disabled"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
                    >
                    </Switch>
                    <CheckboxGroup
                      :placeholder="item?.props?.placeholder || ''"
                      :options="item.props?.options"
                      v-if="item?.widget === 'checkboxes'"
                      v-model:value="formState[key]"
                      :style="item?.props?.style || {}"
                      :disabled="item.props?.disabled"
                      @change="
                        (v) =>
                          props.onFieldChange && props.onFieldChange(key, v)
                      "
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
                    <Table
                      v-if="item.widget === 'table'"
                      :columns="item.props?.columns"
                      :data-source="
                        item.props?.dataSource || formState?.[key] || []
                      "
                      :scroll="item.props?.scroll"
                      :pagination="item.props?.pagination"
                    />
                  </Form.Item>
                </Col>
                <Col
                  :span="24"
                  v-if="key.startsWith('op-group') && uiShowHidden(item)"
                  v-bind:key="sIndex"
                >
                  <div class="flex items-center text-[16px] pb-[16px]">
                    <Classify
                      class="fill-primary w-[16px] h-[16px] mr-[10px]"
                    ></Classify>
                    {{ item.title }}
                  </div>
                </Col>
                <Col
                  :span="24"
                  v-if="key.startsWith('op-desc') && uiShowHidden(item)"
                  v-bind:key="sIndex"
                >
                  <div
                    class="flex items-center text-[12px] px-[20px] pb-[16px] text-zinc-400"
                  >
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
          class="wa-form-footer flex-shrink-0 h-[60px] flex justify-center items-center px-[50px] bg-[#f5f5f5] bottom-0 w-[100%]"
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
            :loading="loading"
          >
            {{
              typeof footerOptions?.submit === 'string'
                ? footerOptions.submit
                : '提交'
            }}
          </Button>
        </div>
      </Form></Spin
    >
  </ThemeProvider>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw, toRef, watch } from 'vue'
import { debounce, isEqual, joinCss } from 'wa-utils'
// @ts-ignore
import {
  Form,
  Input,
  Select,
  TreeSelect,
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
  Tooltip,
  Table,
  AutoComplete,
  Spin
} from 'ant-design-vue'
// @ts-ignore
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { FormRenderProps, SchemaBase } from './type'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { renderSuffix } from './utils'
import Classify from '@/assets/classify.svg'
import { isEmpty } from 'wa-utils'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

const getOptions = (options: any, item: any) => {
  const valueKey = item?.search?.value
  return [...options, ...(item?.props?.options || [])].reduce(
    (result: any[], item: any) => {
      const has = result.some((i) => i?.[valueKey] == item?.[valueKey])
      if (has) {
        return result
      } else {
        return [...result, item]
      }
    },
    []
  )
}

const selectSearch = debounce((v: any, item: any, key: any) => {
  return item?.search
    ?.request({ [item?.search?.key]: v, pageSize: 10, pageNum: 1 })
    .then((res: any) => {
      searchOptions.value = {
        ...searchOptions.value,
        [key]: res?.[item?.search?.dataKey]
      }
    })
}, 500)

const loading = ref(false)
const searchOptions = ref<any>({})

const slot = defineSlots()
const props = defineProps<FormRenderProps>()
const schema = toRef(props, 'schema')
const column = computed(() => {
  const formColumn = +(schema?.value?.column || 1)
  return formColumn
})
const formState = ref<Record<string, any>>({})
const formRef = ref()
const schemaProperties: [string, Partial<SchemaBase>][] = Object.entries(
  schema?.value?.properties || {}
)

schemaProperties.forEach(([key, value]) => {
  formState.value[key] = value?.defaultValue || undefined
  if (value?.search) {
    selectSearch('', value, key)
  }
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
  loading.value = true
  formRef.value
    .validate()
    .then(async () => {
      const formStateValue = toRaw(formState.value)
      Object.keys(formStateValue).forEach((item) => {
        if (
          item.startsWith('占位') ||
          item.startsWith('op-group') ||
          item.startsWith('op-desc')
        ) {
          delete formStateValue[item]
        }
      })
      if (props.onFinish) {
        await props.onFinish(formStateValue)
        loading.value = false
      } else {
        loading.value = false
      }
    })
    .catch(() => {
      loading.value = false
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
const uiShowHidden = (item: Partial<SchemaBase>) => {
  if (isEqual(item?.['ui:hidden'], false)) {
    return false
  } else if (typeof item?.['ui:hidden'] == 'string') {
    const hiddenFn = !eval(item?.['ui:hidden'])
    return hiddenFn
  }
  return true
}
const changeState = (data: any) => {
  Object.keys(data).forEach((item) => {
    formState.value[item] = data?.[item]
  })
}
watch(formState.value, (preState: any, nextState: any) => {
  if (props.onFieldsChanged) {
    props.onFieldsChanged(toRaw(formState.value), {
      preState,
      nextState
    })
  }
})
defineExpose({
  formRef,
  changeState
})
</script>

<style lang="scss">
.spin-wrapper {
  height: 100%;
  .ant-spin-container {
    height: 100%;
  }
}
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
