import './common'

export function formatMoney(value: any) {
  if (value == '-' || value === '--') {
    return value
  }
  if (!value) {
    return '0'
  }
  // 将参数转换为浮点数
  const floatValue = parseFloat(value || 0)

  // 检查是否是有效的数值
  if (isNaN(floatValue)) {
    return 'Invalid value'
  }

  // 使用toFixed()方法将浮点数转换为字符串，并指定小数位数为2
  const formattedValue = floatValue.toFixed(2)

  // 返回格式化后的字符串
  return formattedValue
}
