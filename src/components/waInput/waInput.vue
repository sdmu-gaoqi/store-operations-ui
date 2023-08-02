<template>page</teemplate>

<!-- <template>
  <div class="inputWrapper">
    <div class="lx-input-label" ref="label_ref" v-on:click="clickLabel">
      {{ props.label }}
      <span ref="border_ref" class="lx-input-border"></span>
    </div>
    <a-input
      :label="props.label"
      class="ucAntd-input"
      ref="input_ref"
      @focus="onFocus"
      @blur="onBlur"
      @input="onChange"
      :type="type"
      :defaultValue="defaultValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  label: String,
  placeholder: String,
  type: String,
  onBlur: Function,
  value: String,
  change: Function,
  defaultValue: String
})
const { type = 'text', change = () => {}, defaultValue } = props

const onChange = (event: any) => {
  const value = event?.target?.value || ''
  change(value)
}

const input_ref = ref(null)
const label_ref = ref<HTMLInputElement | null>(null)
const border_ref = ref<HTMLInputElement | null>(null)
const clickLabel = () => {
  input_ref.value && (input_ref.value as HTMLElement).focus()
}
const addFocusClass = (
  current: HTMLElement,
  borderCurrent: HTMLElement,
  params: { active: boolean }
) => {
  const { active } = params
  current.classList.add('focus-label')
  if (active) {
    current.classList.add('active-label')
  }
  current.classList.remove('valid-label')
  borderCurrent.classList.add('focus-border')
  borderCurrent.classList.remove('valid-border')
}
const removeFocusClass = (
  labelCurrent: HTMLElement,
  borderCurrent: HTMLElement
) => {
  labelCurrent.classList.remove('focus-label')
  labelCurrent.classList.remove('active-label')
  labelCurrent.classList.add('valid-label')
  borderCurrent.classList.add('valid-border')
  borderCurrent.classList.remove('focus-border')
}
const removeActive = (labelCurrent: HTMLElement) => {
  labelCurrent.classList.remove('active-label')
}
const initialClass = () => {
  const { value } =
    type === 'password'
      ? (input_ref.value as unknown as { input: { value: string } })?.input!
      : (input_ref.value as unknown as { input: { value: string } })?.input!
  if (value) {
    addFocusClass(label_ref.value!, border_ref?.value!, { active: false })
  } else {
    setTimeout(() => {
      let value = (input_ref.value as unknown as { input: { value: string } })
        ?.input.value
      // 火狐默认记住密码,延迟后会拿到value
      if (value) {
        addFocusClass(label_ref?.value!, border_ref?.value!, { active: false })
      }
    }, 100)
  }
}
const onFocus = () => {
  const { value } =
    type === 'password'
      ? (input_ref.value as unknown as { input: { value: string } })?.input!
      : (input_ref.value as unknown as { input: { value: string } })?.input!
  if (value) {
    addFocusClass(label_ref.value!, border_ref.value!, { active: true })
    return
  }
  addFocusClass(label_ref.value!, border_ref.value!, { active: true })
}
const onBlur = (...rest: any[]) => {
  props.onBlur && props.onBlur(...rest)
  const { value } =
    type === 'password'
      ? (input_ref.value as unknown as { input: { value: string } })?.input!
      : (input_ref.value as unknown as { input: { value: string } })?.input!
  if (value) {
    removeActive(label_ref.value!)
    return
  }
  removeFocusClass(label_ref.value!, border_ref.value!)
}
onMounted(() => {
  initialClass()
})
</script>

<style lang="scss">
.inputWrapper {
  position: relative;
  box-sizing: border-box;
  display: table;
  line-height: normal;
  .lx-input-label.valid-label {
    cursor: text;
  }
  .lx-input-label.focus-label {
    font-size: 12px;
    background: transparent;
    pointer-events: none;
    cursor: default;
    top: 0;
    padding: 4px 5px;
  }
  .lx-input-border {
    transition: all 0.4s;
    transition-timing-function: ease-out;
  }
  .lx-input-border.valid-border {
    width: 0;
  }
  .lx-input-border.focus-border {
    background: transparent;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    width: 100%;
    left: 0;
    transition: all 0.4s;
    transition-timing-function: ease-out;
  }
  .lx-input-label {
    font-size: 16px;
    user-select: none;
    z-index: 2;
    box-sizing: border-box;
    color: #9a9eba;
    background: transparent;
    box-sizing: border-box;
    line-height: 100%;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: calc(100% - 22px);
    min-height: 20px;
    transition: all 0.15s;
    transition-timing-function: ease-out;
  }
  .lx-input-label,
  .lx-input-border {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  span.lx-input-border {
    display: block;
    pointer-events: none;
    width: 100px;
    height: 100%;
    z-index: -1;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill,
  input:-internal-autofill-selected {
    -webkit-text-fill-color: #333 !important;
    background-color: transparent !important;
    transition: background-color 50000s ease-in-out 0s;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
  input {
    background-color: transparent;
    padding-left: 16px !important;
    padding-right: 16px !important;
    font-size: 16px;
    border-color: #e8ebf6;
  }
  input:-webkit-autofill ~ .lx-input-label {
    font-size: 12px;
    background: transparent;
    pointer-events: none;
    cursor: default;
    top: 0;
    padding: 4px 5px;
    .lx-input-border {
      background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
      width: 100%;
      left: 0;
      transition: all 0.15s;
      transition-timing-function: ease-out;
    }
  }
  input::-webkit-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
  }
  input:focus::-webkit-contacts-auto-fill-button {
    opacity: 0 !important;
  }
  .ucAntd-input-affix-wrapper .ucAntd-input-suffix {
    right: 16px;
  }
  .lx-eye {
    height: 16px;
    width: 16px;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style> -->
