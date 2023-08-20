import { defineComponent, onMounted, toRefs, toRef, watch, ref } from 'vue'
import { joinCss, sleep } from 'wa-utils'
import './waInput.scss'
// import { EyeOutlined, EyeInvisibleFilled } from '@ant-design/icons-vue'
import EyeOpen from './eye-open.png'
import EyeClose from './eye-close.png'

const prefixCls = `wa-input`

const inputProps = {
  placeholder: String,
  label: String,
  onBlur: Function,
  onFocus: Function,
  onInput: Function,
  type: String,
  value: String,
  defaultValue: String,
  'class-name': String
}

export default defineComponent({
  name: 'WaInput',
  props: inputProps,
  emits: ['update:value'],
  setup(props, { slots, emit }) {
    const { ...restProps } = toRefs(props).value

    const labelRef = ref(null)
    const inputRef = ref<HTMLInputElement | null>(null)
    const borderRef = ref(null)
    const passwordRef = ref<HTMLImageElement | null>(null)

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
      emit('update:value', value)
      if (!value) {
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

    const label = toRef(props, 'label')

    watch(label, () => {
      initialClass()
    })

    return () => {
      return (
        <div>
          <div
            class={joinCss(
              prefixCls,
              [
                'wrapper',
                slots.prefix ? 'wrapper-prefix' : '',
                slots.suffix ? 'wrapper-suffix' : ''
              ].filter((item) => item)
            )}
          >
            {slots.prefix && (
              <div class={joinCss(prefixCls, ['prefix'])}>{slots.prefix()}</div>
            )}
            <input
              ref={inputRef}
              {...restProps}
              autocomplete="off"
              class={`${joinCss(prefixCls, ['input'])}`}
              onBlur={blur}
              onFocus={focus}
              onInput={_input}
              placeholder={''}
            ></input>
            <div
              class={joinCss(prefixCls, ['label'])}
              ref={labelRef}
              onClick={() => {
                addFocusClass(labelRef.value!, borderRef.value!, {
                  active: true
                })
                inputRef.value?.focus()
              }}
            >
              {label.value}
              <div ref={borderRef} class={joinCss(prefixCls, ['border'])}></div>
            </div>
            {/* @ts-ignore */}
            {(slots.suffix || restProps.type === 'password') && (
              <div class={joinCss(prefixCls, ['suffix'])}>
                {!!slots.suffix ? (
                  slots.suffix()
                ) : (
                  <img
                    src={EyeClose}
                    ref={passwordRef}
                    onClick={() => {
                      if (!inputRef.value || !passwordRef.value) {
                        return
                      }
                      const type = inputRef.value?.type
                      if (type === 'password') {
                        inputRef.value.type = 'text'
                        passwordRef.value.src = EyeOpen
                      } else {
                        inputRef.value.type = 'password'
                        passwordRef.value.src = EyeClose
                      }
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )
    }
  }
})
