export const renderSuffix = (type: string) => {
  switch (type) {
    case 'money':
      return '/元'
    case 'time':
      return '/分钟'
    default:
      return type
  }
}
