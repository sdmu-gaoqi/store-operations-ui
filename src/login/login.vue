<template>
  <div class="login-wrapper">
    <ThemeProvider>
      <div class="login-content">
        <Form
          autocomplete="off"
          name="login"
          @onFinishFailed="(value) => console.log(value)"
          class="login-form"
        >
          <div
            class="login-title text-[#363441] text-[22px] font-bold mb-[30px]"
          >
            <div class="mt-[10px] flex items-center justify-center">
              <span
                :class="`login-tab ${
                  loginType === 'userName' && ' loginActiveTab'
                }`"
                @click="() => changeLoginTye('userName')"
                >账号登录</span
              >
              <div class="w-[1px] h-[16px] bg-slate-600 mx-[20px]" />
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
import { Checkbox, Button, Form, Input, message } from 'ant-design-vue'
import { useInterval } from '@vueuse/core'
import ThemeProvider from '../themeProvider/themeProvider.vue'
import { CommonService, User } from 'store-request'

const commonService = new CommonService()
const userService = new User()

const props = defineProps({
  onFinish: Function,
  getCode: Function,
  loginAfter: Function
})

interface FormState {
  account: string
  password: string
  agree: boolean
}

const formState = reactive<FormState>({
  account: 'admin',
  password: 'admin123',
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
  validate(['account', 'password']).then((value) => {
    userService
      .login({
        username: value.account,
        password: value.password,
        uuid: uuid.value
      })
      .then((res) => {
        if (props.loginAfter) {
          props.loginAfter(res)
        }
      })
      .catch((err) => {
        loginLoading.value = false
        message.error(err?.msg)
        getImgCode()
      })
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
  commonService.getCaptchaImage().then((res) => {
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
  min-width: 1366px;
  min-height: 756px;
  position: relative;
  padding: 0;
  * {
    box-sizing: border-box;
  }
  .login-form {
    position: absolute;
    background: #fff;
    padding: 30px 80px;
    border-radius: 16px;
    right: 180px;
    top: 50%;
    transform: translateY(-50%);
    width: 540px;

    &::after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      bottom: -40px;
      display: block;
      content: '日新月异公司 版权所有 ICP备: 系统版本号V1.0';
      color: #fff;
      text-align: center;
    }
  }
}

.login-tab {
  font-size: 20px;
  color: #6e7da6;
  cursor: pointer;
}

.loginActiveTab {
  @apply text-primary;
}

.login-input {
  border-radius: 6px;
  width: 100%;
}
</style>
