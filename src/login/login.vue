<template>
  <div class="login-wrapper">
    <ThemeProvider>
      <div class="login-content">
        <Form
          autocomplete="off"
          name="login"
          @onSubmit="onFinish"
          @onFinishFailed="(value) => console.log(value)"
          class="login-form"
        >
          <div
            class="login-title text-[#363441] text-[22px] font-bold mb-[30px]"
          >
            欢迎登录
            <div class="mt-[10px]">
              <span
                :class="`login-tab ${
                  loginType === 'userName' && ' loginActiveTab'
                }`"
                @click="() => changeLoginTye('userName')"
                >账号登录</span
              >
              <span
                :class="`login-tab ${
                  loginType === 'phone' && ' loginActiveTab'
                }`"
                @click="() => changeLoginTye('phone')"
                >手机号登陆</span
              >
            </div>
          </div>
          <Form.Item v-bind="validateInfos.account" name="account">
            <Input
              :label="configs.namePlaceholder"
              class="login-input"
              v-model:value="formState.account"
              @pressEnter="onFinish"
              size="large"
            >
              <template #prefix> <user-outlined /> </template>
              ></Input
            >
          </Form.Item>
          <Form.Item v-bind="validateInfos.password" name="password">
            <Input.Password
              :label="configs.passwordPlaceholder"
              class="login-input"
              type="password"
              v-model:value="formState.password"
              @pressEnter="onFinish"
              size="large"
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
            </Input.Password></Form.Item
          >
          <Form.Item v-bind="validateInfos.imgCode" name="imgCode">
            <Input
              :label="'请输入验证码'"
              class="login-input"
              v-model:value="formState.imgCode"
              @pressEnter="onFinish"
              size="large"
              placeholder="请输入验证码"
            >
              <template #suffix> </template>
              >
            </Input>
            <img
              :src="imgCodeUrl"
              @click="getImgCode"
              class="min-w-[100px] absolute top-0 z-10 right-0 h-[40px] cursor-pointer"
          /></Form.Item>
          <div class="flex justify-between items-center pt-[10px]">
            <Form.Item
              v-show="loginType === 'userName'"
              name="agree"
              v-bind="validateInfos.agree"
              class="mb-[0]"
            >
              <Checkbox
                :checked="formState.agree"
                @change="(v) => (formState.agree = v.target.checked)"
                >自动登录</Checkbox
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
              class="w-[100%] h-[40px] mt-[20px] rounded-[6px]"
              htmlType="submit"
              :loading="loginLoading"
              @click="onFinish"
              >登录</Button
            >
          </Form.Item>
        </Form>
      </div>
    </ThemeProvider>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { computed, reactive, ref, watch, onMounted } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import type { LoginType } from './typing'
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { Checkbox, Button, Form, Input } from 'ant-design-vue'
import { useInterval } from '@vueuse/core'
import ThemeProvider from '../themeProvider/themeProvider.vue'

const props = defineProps({
  onFinish: Function,
  getCode: Function
})

interface FormState {
  account: string
  password: string
  code: string
  agree: boolean
  imgCode: string
}

const formState = reactive<FormState>({
  account: 'admin',
  password: 'admin123',
  code: '',
  agree: true,
  imgCode: ''
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
const loginLoading = ref(false)

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
  validate(['account']).then(() => {
    if (props.getCode) {
      props
        .getCode(formState)
        .then(() => {
          resume()
        })
        .catch(() => {})
    }
  })
}

watch(counter, () => {
  if (counter.value >= count) {
    pause()
    reset()
  }
})

const changeLoginTye = (type: 'userName' | 'phone') => {
  clearValidate()
  loginType.value = type
}

const onFinish = () => {
  validate(['account', 'password', 'imgCode']).then((value) => {
    if (props.onFinish) {
      loginLoading.value = true
      props
        .onFinish({
          ...value,
          uuid: uuid.value
        })
        .finally(() => {
          loginLoading.value = false
        })
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

const imgCodeUrl = ref('')
const uuid = ref('')
const getImgCode = () => {
  fetch('http://vue.ruoyi.vip/prod-api/captchaImage')
    .then((res) => res.json())
    .then((res) => {
      imgCodeUrl.value = `data:image/gif;base64,${res.img}`
      uuid.value = res.uuid
    })
}
onMounted(() => {
  getImgCode()
})

defineExpose({
  getImgCode
})
</script>

<style lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  user-select: none;
}
.login-content {
  width: 100%;
  height: 100%;
  background-image: url('../assets/loginBanner.png');
  background-size: cover;
  background-position: 0 -60px;
  min-width: 1366px;
  min-height: 756px;
  position: relative;
  padding: 0;
  * {
    box-sizing: border-box;
  }
  .login-form {
    position: absolute;
    left: 60%;
    top: 25vh;
    width: 25%;
  }
}

.login-tab {
  font-size: 14px;
  color: #6e7da6;
  cursor: pointer;
  margin-right: 10px;
}

.loginActiveTab {
  @apply text-primary;
}

.login-input {
  border-radius: 6px;
  width: 100%;
}
</style>
