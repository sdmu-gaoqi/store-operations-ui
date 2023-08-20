<template>
  <div
    class="shadow-lg bg-white flex items-start rounded-[10px] overflow-hidden w-[875px]"
  >
    <div class="login-banner">
      <div class="login-banner-content">
        <div class="mb-[50px]">门店管理系统</div>
        <div class="text-[14px]">版本号：V1.0.0</div>
      </div>
    </div>

    <div class="login-content">
      <div class="login-title mb-[50px] flex items-center">
        {{ configs.title }}

        <span
          class="text-primary text-[12px] cursor-pointer ml-auto select-none"
          @click="changeLoginTye"
          >{{ configs.checkText }}</span
        >
      </div>
      <Form autocomplete="off" name="login">
        <Form.Item class="mb-[40px]" v-bind="validateInfos.account">
          <Input
            :label="configs.namePlaceholder"
            class="login-input"
            v-model:value="formState.account"
          >
            <template #prefix> <user-outlined /> </template>
            ></Input
          >
        </Form.Item>
        <Form.Item v-bind="validateInfos.password">
          <Input
            :label="configs.passwordPlaceholder"
            class="login-input"
            type="password"
            v-model:value="formState.password"
          >
            <template #prefix> <user-outlined /> </template>
            <template #suffix v-if="!isAccount">
              <span
                class="cursor-pointer text-primary text-[12px]"
                @click="getCode"
                >{{
                  counter < count && counter > 0
                    ? count - counter
                    : '获取验证码'
                }}</span
              >
            </template>
            >
          </Input></Form.Item
        >
        <div class="flex justify-between items-center h-[100px]">
          <Form.Item
            v-show="loginType === 'userName'"
            name="agree"
            v-bind="validateInfos.agree"
            class="mb-[0]"
          >
            <Checkbox
              :checked="formState.agree"
              @change="(v) => (formState.agree = v.target.checked)"
              >记住密码</Checkbox
            >
          </Form.Item>
          <div
            v-show="loginType === 'userName'"
            class="text-primary text-[12px] cursor-pointer"
          >
            忘记密码?
          </div>
        </div>
        <Form.Item>
          <Button
            type="primary"
            class="w-[100%] h-[40px] mt-[20px]"
            @click.prevent="onFinish"
            >登录</Button
          ></Form.Item
        >
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/index'
import { UserOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref, watch } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import type { LoginType } from './typing'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { Checkbox, Button, Form } from 'ant-design-vue'
import { useInterval } from '@vueuse/core'

const props = defineProps({
  onFinish: Function
})

interface FormState {
  account: string
  password: string
  code: string
  agree: boolean
}

const formState = reactive<FormState>({
  account: '',
  password: '',
  code: '',
  agree: true
})

const accountConfigs = {
  namePlaceholder: '请输入用户名称',
  passwordPlaceholder: '请输入登录密码',
  title: '账号登录 USER LOGIN',
  checkText: '手机号登陆'
}

const phoneConfigs = {
  namePlaceholder: '请输入手机号码',
  passwordPlaceholder: '请输入验证码',
  title: '手机号登录 USER LOGIN',
  checkText: '账号登陆'
}

const loginType = ref<LoginType>('userName')

const configs = computed(() => {
  const isAccount = loginType.value === 'userName'
  return isAccount ? accountConfigs : phoneConfigs
})

const rulesRef = computed(() => ({
  account: [
    {
      required: true,
      message: configs.value.namePlaceholder
    }
  ],
  password: [
    {
      required: true,
      message: configs.value.passwordPlaceholder
    }
  ],
  code: [
    {
      required: true,
      message: configs.value.passwordPlaceholder,
      type: 'array'
    }
  ]
}))

const count = 61

const intervalData = useInterval(1000, { controls: true })

const useForm = Form.useForm
const { validateInfos, clearValidate, validate } = useForm(formState, rulesRef)

const { counter, reset, pause, resume } = intervalData

pause()

const getCode = () => {
  resume()
}

watch(counter, () => {
  if (counter.value >= count) {
    pause()
    reset()
  }
})

const changeLoginTye = () => {
  clearValidate()
  loginType.value = loginType.value === 'userName' ? 'phone' : 'userName'
}

const onFinish = () => {
  validate(['account', 'password']).then((value) => {
    if (props.onFinish) {
      props.onFinish(value)
    }
  })
}

const isAccount = computed(() => {
  return loginType.value === 'userName'
})

watch([formState.agree, formState.password], () => {
  if (formState.agree) {
  }
})
</script>

<style lang="scss">
.login-banner {
  @apply w-[396px] min-h-[538px] bg-gradient-to-r from-blue-300 to-blue-100 flex items-center justify-center;
  .login-banner-content {
    @apply text-white h-[100%] w-[100%] text-center text-[20px];
  }
  * {
    box-sizing: border-box;
  }
}
.login-content {
  @apply w-[400px] min-h-[538px] py-[50px] px-[40px] box-border;
  * {
    box-sizing: border-box;
  }
}
</style>
