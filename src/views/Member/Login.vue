<template>
  <div class="login">
    <div class="loginContainer">
      <span class="title">欢迎登录 LoadRunnerX 压力测试平台</span>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="密码登陆" name="account">
          <el-form :model="form" ref="accountFormRef" :rules="accountRules" style="width: 100%;">
            <el-form-item prop="userName">
              <el-input
                  v-model.trim="form.userName"
                  placeholder="请输入用户名"
                  clearable
                  :prefix-icon="User"
                  size="large"
                  style="width: 100%;"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model.trim="form.password"
                  placeholder="请输入密码"
                  type="password"
                  clearable
                  :prefix-icon="Lock"
                  size="large"
              />
            </el-form-item>
            <el-form-item prop="code">
              <div class="codeImg">
                <div class="codeInput">
                  <el-input
                      v-model.trim="form.code"
                      placeholder="请输入验证码"
                      clearable
                      size="large"
                      @keydown.enter="submit(accountFormRef)"
                  />
                </div>
                <div class="codePicture" @click="getCode">
                  <el-image style="width: 100%;height: 100%" :src="CodeImg" fit="fill"/>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div class="operate">
            <div>
              <el-checkbox v-model="form.isRememberPassword" label="记住密码" size="small"/>
            </div>
            <div>
              <router-link to="/member/retrievePassword">
                <el-link>忘记密码?</el-link>
              </router-link>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="phone">
          <el-form :model="phoneForm" ref="phoneFormRef" :rules="phoneFormRules" style="width: 100%;">
            <el-form-item prop="phone">
              <el-input
                  v-model.trim="phoneForm.phone"
                  placeholder="请输入手机号"
                  clearable
                  :prefix-icon="User"
                  size="large"
                  style="width: 100%;"
              />
            </el-form-item>
            <el-form-item prop="code">
              <div class="phoneCode">
                <el-input
                    v-model.trim="phoneForm.code"
                    placeholder="请输入验证码"
                    type="password"
                    :prefix-icon="Lock"
                    size="large"
                />
                <!--垂直分割线-->
                <div class="divider"></div>
                <!--获取验证码按钮-->
                <el-button
                    link
                    :type="phoneBtn.type"
                    class="btnCode"
                    :disabled="phoneBtn.disabled"
                    @click="getEmailCode(phoneBtn)"
                >{{ phoneBtn.btnText }}
                </el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱登陆" name="email">
          <el-form :model="emailForm" ref="emailFormRef" :rules="emailFormRules" style="width: 100%;">
            <el-form-item prop="email">
              <el-input
                  v-model.trim="emailForm.email"
                  placeholder="请输入邮箱"
                  clearable
                  :prefix-icon="User"
                  size="large"
                  style="width: 100%;"
              />
            </el-form-item>
            <el-form-item prop="code">
              <div class="emailCode">
                <el-input
                    v-model.trim="emailForm.code"
                    placeholder="请输入验证码"
                    type="password"
                    :prefix-icon="Lock"
                    size="large"
                />
                <!--垂直分割线-->
                <div class="divider"></div>
                <!--获取验证码按钮-->
                <el-button
                    link
                    :type="emailBtn.type"
                    class="btnCode"
                    :disabled="emailBtn.disabled"
                    @click="getEmailCode(emailBtn)"
                >{{ emailBtn.btnText }}
                </el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="publicModule">
        <el-space direction="vertical" :size="15" alignment="normal" style="width: 100%;">
          <el-button type="primary" size="large" class="loginBtn" @click="submit" :loading="loginState">{{ filterLoginState(loginState) }}</el-button>
          <div class="gotoRegister">
            <router-link to="/member/register">
              <el-link type="primary">没有账号我要免费注册>></el-link>
            </router-link>
          </div>
        </el-space>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {userInfoStore} from "@/sort/sorts/login.js";
import {reactive, ref, onMounted, computed} from "vue";
import {getCodeImg, login} from "@/api/login/login.js";
import {User, Lock} from "@element-plus/icons-vue";
import {setToken} from "@/utils/auth";
import {encrypt, decrypt} from "@/utils/jsencrpyt";
import Code from "@/components/Icon/Code.vue";
import {successTools} from "@/utils/Tools";
// 初始化 获取图片验证码
onMounted(() => {
//   获取验证码
  getCode();
});

const router = useRouter();
const sort = userInfoStore();

// 初始化accountForm ref
const accountFormRef = ref(null);
// 初始化 phoneFormRef
const phoneFormRef = ref(null);
// 初始化 emailFormRef
const emailFormRef = ref(null);

let CodeImg = ref("");
// form表单内容
const form = reactive({
  // 是否记住密码
  isRememberPassword: sort.userInfo.isRememberPassword,
  userName: sort.userInfo.userName,
  password: decrypt(sort.userInfo.password),
  code: sort.userInfo.code,
  uuid: "",
});
// phone表单内容
const phoneForm = reactive({
  phone: "",
  code: ""
})
// email表单内容
const emailForm = reactive({
  email: "",
  code: ""
})


// 初始化tabs
const activeName = ref('account')
// account表单规则
const accountRules = reactive({
  userName: [
    {required: true, message: '请输入用户名!', trigger: 'change'},
  ],
  password: [
    {required: true, message: '请输入密码!', trigger: 'change'},
  ],
  code: [
    {required: true, message: '请输入验证码!', trigger: 'change'},
  ]
})
// phone表单规则
const phoneFormRules = reactive({
  phone: [
    // {required: true, message: '请输入手机号码!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 手机号正则
        const phoneRegex = /^1[3-9]\d{9}$/;
        if ((!phoneRegex.test(value)) && value != "") {
          phoneBtn.disabled = true;
          callback(new Error('请输入正确手机号'))
        } else {
          value == "" ? phoneBtn.disabled = true : phoneBtn.disabled = false;
          callback()
        }
      },
      trigger: "change"
    }
  ],
  code: [
    {required: true, message: '请输入验证码!', trigger: 'change'},
  ]
})
// email表单规则
const emailFormRules = reactive({
  email: [
    // {required: true, message: '请输入邮箱!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 邮箱正则
        const emailRegex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/ ;
        if ((!emailRegex.test(value))&&value!="") {
          emailBtn.disabled=true;
          callback(new Error('请输入正确邮箱'))
        } else {
          value==""?emailBtn.disabled=true:emailBtn.disabled=false;
          callback()
        }
      },
      trigger: "change"
    }
  ],
  code: [
    {required: true, message: '请输入验证码!', trigger: 'change'},
  ]
})
// 登录按钮状态
const loginState = ref(false);


// 切换tabs
const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 提交表单
function submit() {
  // 判断表单是否满足验证要求
  if (activeName.value == "account") {
    accountFormRef.value.validate(v => {
      if (v) {
        loginState.value = true
        /*
        * 发送网络请求返回200的时候 做以下的操作
        * 非200的情况 弹窗说明原因
        * */
        // 如果勾选了 记住密码 把账号密码放进缓存
        const loginForm = {
          username: form.userName,
          password: form.password,
          code: form.code,
          uuid: form.uuid
        }
        login(loginForm).then(res => {
          if (res.code == 200) {
            if (form.isRememberPassword) {
              const cacheForm = {
                ...form,
                password: encrypt(form.password),
                code: ""
              }
              sort.setuserInfo(cacheForm);
            } else {
              const form = {userName: "", password: "", isRememberPassword: false}
              sort.setuserInfo(form)
            }
            // 把token放到本地缓存
            setToken(res.token)
            // 跳转到主页面
            router.replace("/index");
          }
        }).catch((err) => {
          console.log("errMsg--->", err.message)
          getCode()
        }).finally(() => {
          loginState.value = false
        })

      }
    })
  } else if (activeName.value == "phone") {
    phoneFormRef.value.validate(v => {
      if (v) {

      }
    })
  } else if (activeName.value == "email") {
    emailFormRef.value.validate(v => {
      if (v) {

      }
    })
  }

}

// 获取验证码
function getCode() {
  getCodeImg().then((res) => {
    if (res.code == 200) {
      CodeImg.value = "data:image/gif;base64," + res.img;
      form.uuid = res.uuid
    }
  });
}

// 邮箱验证码按钮属性
const emailBtn = reactive({
  type: "primary",
  btnText: "获取验证码",
  disabled: true,
})
// 手机验证码按钮属性
const phoneBtn = reactive({
  type: "primary",
  btnText: "获取验证码",
  disabled: true,
})

function getEmailCode(EL) {
  EL.type = "";
  EL.disabled = true;
  EL.btnText = "请稍候...";
  // 延迟500毫秒
  setTimeout(() => {
    doLoop(60, EL);
  }, 500);
}

// 手机验证码的倒计时
function doLoop(seconds, EL) {
  successTools("验证码已发送!")
  seconds = seconds ? seconds : 60;
  EL.btnText = seconds + "s后获取";
  setTimeout(() => {
    if (seconds > 0) {
      EL.btnText = seconds + "s后获取";
      --seconds;
    }
  }, 1000)
  let countdown = setInterval(() => {
    if (seconds > 0) {
      EL.btnText = seconds + "s后获取";
      --seconds;
    } else {
      EL.btnText = "获取验证码";
      EL.disabled = false;
      EL.type = "primary";
      clearInterval(countdown);
    }
  }, 1000);
}

// 登录状态 过滤器
const filterLoginState = computed(() => {
  return (v) => {
    if (v) return "登录中";
    return "登录"
  }
})
</script>
<style lang="scss" scope>
.login {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;

  .loginContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .tabs {
      width: min-content;
      min-height: 252px;

      .codeImg {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .codeInput {
          flex: 3;
        }

        .codePicture {
          cursor: pointer;
          height: 40px;
          flex: 2;
          margin-left: 15px;
        }
      }

      .operate {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .emailCode, .phoneCode {
        width: 100%;
        display: flex;
        align-items: center;

        .divider {
          width: 1.5px;
          height: 25px;
          background: #dcdfe6;
          position: absolute;
          right: 90px;
        }

        .btnCode {
          min-width: 70px;
          text-align: center;
          position: absolute;
          right: 8px;
        }
      }

    }

    .publicModule {
      margin-top: 15px;
      width: 250px;

      .loginBtn {
        width: 100%;
      }

      .gotoRegister {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }


  }

}
</style>
