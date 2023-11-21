export const schema = {
  title: '订单列表',
  form: {
    search: true,
    export: false,
    fields: []
  },
  tabs: [
    {
      title: '会员订单',
      key: 'one',
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderId'
        },
        {
          title: '订单金额/元',
          dataIndex: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'currency'
        },
        {
          title: '付款明细/元',
          dataIndex: 'detail'
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
          title: '房间号',
          dataIndex: 'homeCode'
        },
        {
          title: '会员卡余额',
          dataIndex: 'cardMoney'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        }
      ]
    },
    {
      title: '非会员订单',
      key: 'two',
      columns: [
        {
          title: '订单编号',
          dataIndex: 'orderId'
        },
        {
          title: '订单金额/元',
          dataIndex: 'money'
        },
        {
          title: '优惠金额/元',
          dataIndex: 'currency'
        },
        {
          title: '付款明细/元',
          dataIndex: 'detail'
        },
        {
          title: '订单状态',
          dataIndex: 'status'
        },
        {
          title: '房间号',
          dataIndex: 'homeCode'
        },
        {
          title: '创建日期',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'options',
          options: ['detail']
        }
      ]
    }
  ],
  options: {
    status: [
      { label: '正常', value: 1 },
      { label: '不正常', value: 2 }
    ],
    level: [
      { label: '1级会员', value: 1 },
      { label: '2级会员', value: 2 }
    ]
  }
}

export const dataSource = [
  {
    orderId: '1',
    money: '100',
    currency: '100',
    detail: '100',
    status: 1,
    name: '名字',
    level: 1,
    phone: '15555555555',
    homeCode: 101,
    cardMoney: 100,
    createTime: '2012-01-01'
  }
]
