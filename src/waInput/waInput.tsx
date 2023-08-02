import { defineComponent, onMounted, shallowRef, toRaw } from 'vue'
import { joinCss, sleep } from 'wa-utils'
import './waInput.scss'

const prefixCls = `wa-input`

const inputProps = {
  placeholder: String,
  label: String,
  onBlur: Function,
  onFocus: Function,
  onInput: Function,
  type: String,
  value: String,
  defaultValue: String
}

export default defineComponent({
  name: 'WaInput',
  props: inputProps,
  setup(props) {
    const { ...restProps } = toRaw(props)
    const labelRef = shallowRef(null)
    const inputRef = shallowRef<HTMLInputElement | null>(null)
    const borderRef = shallowRef(null)

    const focusCss = joinCss(prefixCls, ['label-focus'])
    const activeCss = joinCss(prefixCls, ['label-active'])
    const validCss = joinCss(prefixCls, ['label-valid'])
    const focusBorderCss = joinCss(prefixCls, ['border-focus'])
    const validBorderCss = joinCss(prefixCls, ['border-valid'])

    const addFocusClass = (
      current: HTMLElement,
      borderCurrent: HTMLElement,
      params: { active: boolean }
    ) => {
      const { active } = params
      current.classList.add(focusCss)
      if (active) {
        current.classList.add(activeCss)
      }
      current.classList.remove(validCss)
      borderCurrent.classList.add(focusBorderCss)
      borderCurrent.classList.remove(validBorderCss)
    }
    const removeFocusClass = (
      labelCurrent: HTMLElement,
      borderCurrent: HTMLElement
    ) => {
      labelCurrent.classList.remove(focusCss)
      labelCurrent.classList.remove(activeCss)
      labelCurrent.classList.add(validCss)
      borderCurrent.classList.add(validBorderCss)
      borderCurrent.classList.remove(focusBorderCss)
    }
    const removeActive = (labelCurrent: HTMLElement) => {
      labelCurrent.classList.remove(activeCss)
    }

    const blur = (e: FocusEvent) => {
      props.onBlur?.(e)
      const value = inputRef.value?.value
      if (value) {
        removeActive(labelRef.value!)
        return
      }
      removeFocusClass(labelRef.value!, borderRef.value!)
    }
    const focus = (e: FocusEvent) => {
      props.onFocus?.(e)
      addFocusClass(labelRef.value!, borderRef.value!, { active: true })
    }
    const _input = (e: Event) => {
      const value = inputRef.value?.value
      if (props.onInput) {
        props.onInput(e)
      }
      if (!value) {
        removeFocusClass(labelRef.value!, borderRef.value!)
        return
      }
      addFocusClass(labelRef.value!, borderRef.value!, { active: true })
    }

    const initialClass = async (aborting?: boolean) => {
      const inputTarget: HTMLInputElement = inputRef?.value as HTMLInputElement
      const value = inputTarget?.value
      if (value) {
        addFocusClass(labelRef.value!, borderRef.value!, { active: false })
        return
      }
      if (aborting) {
        return
      }
      await sleep(100)
      // 火狐默认记住密码,延迟后会拿到value
      initialClass(true)
    }

    onMounted(() => {
      initialClass()
    })

    return () => {
      return (
        <div class={joinCss(prefixCls, ['wrapper'])}>
          <div class={joinCss(prefixCls, ['label'])} ref={labelRef}>
            {restProps.label}
            <div ref={borderRef} class={joinCss(prefixCls, ['border'])}></div>
          </div>
          <input
            ref={inputRef}
            {...restProps}
            onBlur={blur}
            onFocus={focus}
            onInput={_input}
            placeholder={''}
          ></input>
        </div>
      )
    }
  }
})
