# FormRender

## FormRender Demo

<FormCard title="新增房间">
  <template #content>
    <FormRender
      :schema="editSchema"
      :onFieldsChanged="() => {}"
    >
    <template #table4>
    <div>this is table4</div></template>
    </FormRender>
  </template>
</FormCard>

::: details

```
import { defineComponent } from 'vue'
import { TableRender } from 'wa-components'

export default defineComponent({
  setup() {
    return () => {
      return <InpTableRenderut></InpTableRenderut>
    }
  }
})

```

:::

<script lang="ts" setup>
import { FormRender, FormCard } from '../../src/index'
import { debounce } from 'wa-utils'
import 'ant-design-vue/dist/reset.css';
import { Member } from 'store-request'

const member = new Member()

const editSchema = {
  type: 'object',
  rules: {
    code: [
      {
        required: true,
        message: '请输入编号'
      }
    ]
  },
  properties: {
    memberId: {
      title: '查找会员',
      type: 'string',
      search: {
        key: 'phone',
        label: 'memberName',
        value: 'memberId',
        // request: member.list,
        dataKey: 'rows',
        format: (v) => {
          return v?.map(item => ({
            ...item,
            memberName: `${item?.memberName}(${item?.memberNo}-${item?.phone})`
          }))
        }
      },
      props: {
        options: [ { memberName: 'hh', memberId: 'hh', hidden: true } ]
      },
      widget: 'searchSelect'
    },
    name: {
      title: '房间名称',
      type: 'string',
      defaultValue: 'hhhhhh',
      required: true,
      maxWidth: '340px',
      widget: 'text',
      props: {
        placeholder: '请输入',
        maxLength: 10,
        type: 'password'
      },
      message: {
        required: '请输入房间名称',
        min: '超出最大限制'
      },
      min: 12,
      'ui:hidden': "formState.value.id === 1" // 关联字段 处理动态展示
    },
    id: {
      title: '房间id',
      type: 'number',
      defaultValue: '123456',
      required: true,
      maxWidth: '340px',
      widget: 'input',
      props: {
        placeholder: '请输入',
        maxLength: 10
      },
      message: {
        required: '请输入房间名称',
        min: '超出最大限制'
      },
      min: 12
    },
    type: {
      title: '房间类型',
      type: 'string',
      defaultValue: 'A',
      required: true,
      maxWidth: '340px',
      widget: 'select',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          }
        ],
        mode: 'single'
      }
    },
    desc: {
      title: '房间设备描述',
      type: 'string',
      widget: 'textArea',
      props: {
        placeholder: '请输入'
      }
    },
    tip: {
      title: '备注',
      type: 'string',
      defaultValue: '',
      maxWidth: '340px',
      widget: 'textArea',
      props: {
        placeholder: '请输入'
      }
    },
    'fr-7950': {
      title: '点击单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          },
          {
            label: 'C',
            value: 'C'
          }
        ]
      }
    },
    'fr-esh4': {
      title: '日期选择',
      type: 'string',
      defaultValue: '2023-09-12',
      maxWidth: '340px',
      format: 'date',
      widget: 'datePicker',
      props: {
        placeholder: '请选择日期'
      }
    },
    'fr-4d0t': {
      title: '日期区间选择',
      type: 'range',
      format: 'date',
      defaultValue: ['2023-09-10', '2023-10-06'],
      maxWidth: '340px',
      widget: 'dateRange',
      props: {
        placeholder: ['开始时间', '结束时间']
      }
    },
    'fr-3tlc': {
      title: '时间选择',
      type: 'string',
      format: 'time',
      maxWidth: '340px',
      widget: 'timePicker',
      props: {
        placeholder: '请选择时间'
      }
    },
    B: {
      title: '时间区间',
      type: 'range',
      format: 'time',
      required: true,
      message: {
        required: '请选择'
      },
      maxWidth: '340px',
      widget: 'timeRange',
      props: {
        placeholder: ['开始时间', '结束时间'],
        showSecond: false
      }
    },
    A: {
      title: '开关',
      type: 'boolean',
      description: '',
      tooltip: {
        title: '这是提示'
      },
      extra: '这是desc',
      required: true,
      message: {
        required: '这是必填校验'
      },
      maxWidth: '340px',
      widget: 'switch',
      defaultValue: true,
      props: {
        placeholder: '',
        checkedChildren: '开',
        unCheckedChildren: '关'
      }
    },
    'fr-j2rq': {
      title: '点击多选',
      type: 'array',
      widget: 'checkboxes',
      props: {
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          },
          {
            label: 'C',
            value: 'C'
          }
        ],
        direction: 'row'
      }
    },
    'fr-h4jb': {
      title: '点击单选',
      type: 'string',
      widget: 'radio',
      props: {
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          },
          {
            label: 'C',
            value: 'C'
          }
        ]
      }
    },
    'fr-1a8o': {
      title: '评分',
      widget: 'rate',
      props: {
        allowClear: true,
        count: 5
      }
    },
    code: {
      title: '房间编号',
      type: 'string',
      required: true,
      message: {
        required: ' 请输入房间编号',
        pattern: '请输入数字',
      },
      props: {
        options: [
          {
            label: '1折',
            value: '1'
          }
        ]
      },
      pattern: '/^\\d+$/',
      widget: 'input'
    },
    'fr-9zam': {
      title: '下拉多选',
      type: 'array',
      widget: 'multiSelect',
      props: {
        placeholder: '请选择',
        options: [
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          }
        ],
        mode: 'multiple',
      }
    },
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px',
  footer: {
    reset: true,
    cancel: '返回'
  }
}


const onFinish = (value: Record<string, any>) => {
  console.log(value)
}
const onCancel = debounce(() => {
})
</script>
