# TableRender

## TableRender Demo

<TableRender :list="[{
  orderId: 'orderId'
}]" 
ref="tRef"
:schema="schema"
v-model:activeKey="activeKey"
:drawer="{schema: editSchema, onFinish: async(v) => console.log(tRef.drawerFormRef), width: 1000, finishBefore: '测试', ref: drawerFormRef}"
:request="(value) => console.log(value)">
<template v-slot:formButton><div>自定义按钮</div></template>
<template #bodyCell="{data}">

<div v-if="data?.column?.dataIndex === 'orderId'" @click="() => {tRef.drawer()}">
哈哈哈
</div>
<template v-else>
{{data.text}}
</template>
</template>
</TableRender>

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
import { TableRender } from '../../src/index'
import { ref } from 'vue'
import { Common } from 'store-request'
const tRef = ref()

const activeKey = ref('')

const schema = {
  title: '员工列表',
  tabKey: 'hh',
  form: {
    search: true,
    export: false,
    reset: true,
    fields: [
      {
        type: 'search',
        label: '工号',
        placeholder: '工号',
        key: 'card'
      },
      {
        type: 'search',
        label: '姓名',
        placeholder: '姓名',
        key: 'name'
      },
      {
        type: 'date',
        label: '手机号码',
        placeholder: '手机号码',
        key: 'phone'
      },
      {
        type: 'select',
        label: '角色',
        key: 'role'
      }
    ]
  },
  tabs: [
    {
      title: '会员订单',
      key: 'one',
      columns: [
        {
          fixed: true,
          title: '会员编号',
          dataIndex: 'orderId'
        },
        {
          title: '会员卡号',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '姓名',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '手机号码',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status'
        },
        {
          title: '会员姓名',
          dataIndex: 'name'
        },
        {
          title: '会员等级',
          dataIndex: 'level'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '会员等级',
          dataIndex: 'homeCode'
        },
        {
          title: '会员卡余额',
          dataIndex: 'cardMoney'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          title: '开卡日期',
          dataIndex: 'cardTime'
        },
        {
          title: '最近消费日期',
          dataIndex: 'payTime'
        },
        {
          title: '备注',
          dataIndex: 'desc'
        },
        {
          fixed: 'right',
          title: '操作',
          dataIndex: 'options',
          options: ['detail'],
          buttonGroup: [
            { title: 'hh' }
          ]
        }
      ]
    },
    {
      title: '非会员订单',
      key: 'two',
      columns: [
        {
          fixed: true,
          title: '会员编号',
          dataIndex: 'orderId'
        },
        {
          title: '会员卡号',
          dataIndex: 'money',
          format: 'money'
        },
        {
          title: '姓名',
          dataIndex: 'currency',
          format: 'money'
        },
        {
          title: '手机号码',
          dataIndex: 'detail',
          format: 'money'
        },
        {
          title: '订单状态',
          dataIndex: 'status'
        },
        {
          title: '会员姓名',
          dataIndex: 'name'
        },
        {
          title: '会员等级',
          dataIndex: 'level'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '会员等级',
          dataIndex: 'homeCode'
        },
        {
          title: '会员卡余额',
          dataIndex: 'cardMoney'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          title: '开卡日期',
          dataIndex: 'cardTime'
        },
        {
          title: '最近消费日期',
          dataIndex: 'payTime'
        },
        {
          title: '备注',
          dataIndex: 'desc'
        },
        {
          fixed: 'right',
          title: '操作',
          dataIndex: 'options',
          options: ['detail'],
          buttonGroup: [
            { title: 'hh' }
          ]
        }
      ]
    }
  ],
  options: {
    role: [
      { label: '收银', value: 1 },
      { label: '技师', value: 2 },
      { label: '店长', value: 3 },
      { label: '老板', value: 4 }
    ]
  }
}

const editSchema = {
  type: 'object',
  rules: {
    coode: {
      required: true,
      message: '请输入包厢号'
    },
    category: {
      required: true,
      message: '请选择包厢类型'
    },
    lowestPrice: {
      required: true,
      message: '请输入最低消费'
    },
    overtimeDuration: {
      required: true,
      message: '请输入消费时长'
    },
    overtimeUnitPrice: {
      required: true,
      message: '请输入超时收费'
    }
  },
  properties: {
    code: {
      title: '包厢号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      widget: 'input'
    },
    name: {
      title: '包厢名称',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入包厢名称'
      },
      widget: 'input'
    },
    isLowest: {
      title: '是否有最低消费',
      type: 'string',
      widget: 'radio',
      defaultValue: 1,
      props: {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 }
        ]
      }
    },
    capacityNum: {
      title: '容纳人数',
      type: 'number',
      widget: 'input',
      props: {
        precision: 0
      }
    },
    lowestPrice: {
      title: '最低消费',
      type: 'number',
      widget: 'input',
      defaultValue: '0',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      }
    },
    overtimeDuration: {
      title: '消费时长',
      type: 'number',
      widget: 'input',
      defaultValue: '0',
      props: {
        placeholder: '请输入',
        suffix: '小时',
        type: 'number',
        precision: 0
      }
    },
    overtimeUnitPrice: {
      title: '超时收费',
      type: 'number',
      widget: 'input',
      defaultValue: '0',
      props: {
        placeholder: '请输入',
        suffix: 'money',
        type: 'number'
      }
    },
    remark: {
      title: '备注',
      type: 'string',
      widget: 'textArea',
      span: 24
    }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
}

</script>
