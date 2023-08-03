import type { Events } from 'vue'

type PropKeys = keyof Events | string

export const NativeInputProps = () => {
  return
}

export const NavitePropsTsx = (otherOptions?: Record<PropKeys, any>) => {
  return {
    placeholder: String,
    label: String,
    onClick: Function,
    onBlur: Function,
    onFocus: Function,
    onInput: Function,
    type: String,
    value: String,
    defaultValue: String,
    class: String,
    ...(otherOptions && {
      ...otherOptions
    })
  }
}
