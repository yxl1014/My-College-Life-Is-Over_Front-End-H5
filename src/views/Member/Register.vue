<template>
  <div class="register">
    <div class="registerContainer">
      <span class="title">注册 LoadRunnerX 压力测试平台</span>
      <el-steps :active="currentStep" finish-status="success" process-status="finish" align-center :space="100" class="register_steps">
        <el-step title="填写账号密码"/>
        <el-step title="绑定邮箱/手机号"/>
        <el-step title="设置密保"/>
        <el-step title="完成注册"/>
      </el-steps>
      <el-tabs v-model="currentStep" class="tabs">
        <el-tab-pane :name="0">
          <el-form :model="accountForm" ref="accountFormRef" :rules="accountRules" class="myForm">
            <el-form-item prop="userName">
              <el-input
                  v-model.trim="accountForm.userName"
                  placeholder="请输入用户名"
                  clearable
                  :prefix-icon="User"
                  size="large"
                  class="user_name"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model.trim="accountForm.password"
                  placeholder="请输入密码"
                  type="password"
                  class="password"
                  clearable
                  show-password
                  :prefix-icon="Lock"
                  size="large"
              />
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input
                  v-model.trim="accountForm.confirmPassword"
                  placeholder="请再次输入密码"
                  type="password"
                  clearable
                  show-password
                  :prefix-icon="Lock"
                  size="large"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(accountFormRef)"> 下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="1">
          <el-form :model="emailPhoneForm" ref="emailPhoneFormRef" :rules="emailPhoneRules" class="myForm">
            <el-form-item prop="email">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="如不需绑定邮箱不要填写直接下一步即可"
                  placement="top"
              >
                <el-input
                    v-model.trim="emailPhoneForm.email"
                    placeholder="请输入邮箱地址"
                    clearable
                    :prefix-icon="Message"
                    size="large"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item prop="emailCode">
              <div class="emailCode">
                <el-input
                    v-model.trim="emailPhoneForm.emailCode"
                    placeholder="请输入邮箱验证码"
                    :prefix-icon="Code"
                    size="large"
                    maxlength="4"
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
            <el-form-item prop="phone">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="如不需绑定手机不要填写直接下一步即可"
                  placement="top"
              >
                <el-input
                    v-model.trim="emailPhoneForm.phone"
                    placeholder="请输入手机号"
                    clearable
                    :prefix-icon="Iphone"
                    size="large"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item prop="phoneCode">
              <div class="phoneCode">
                <el-input
                    v-model.trim="emailPhoneForm.phoneCode"
                    placeholder="请输入手机验证码"
                    :prefix-icon="Code"
                    size="large"
                    maxlength="4"
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
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(emailPhoneFormRef)"> 下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="2">
          <el-form :model="confidentialityForm" ref="confidentialityFormRef" :rules="confidentialityRules" class="myForm">
            <el-form-item prop="problemOne">
              <el-input
                  v-model.trim="confidentialityForm.problemOne"
                  placeholder="请输入密保问题一"
                  clearable
                  :prefix-icon="EditPen"
                  size="large"
              />
            </el-form-item>
            <el-form-item prop="answerOne">
              <el-input
                  v-model.trim="confidentialityForm.answerOne"
                  placeholder="请输入密保问题答案一"
                  clearable
                  :prefix-icon="Document"
                  size="large"
              />
            </el-form-item>
            <el-form-item prop="problemTwo">
              <el-input
                  v-model.trim="confidentialityForm.problemTwo"
                  placeholder="请输入密保问题二"
                  clearable
                  :prefix-icon="EditPen"
                  size="large"
              />
            </el-form-item>
            <el-form-item prop="answerTwo">
              <el-input
                  v-model.trim="confidentialityForm.answerTwo"
                  placeholder="请输入密保问题答案二"
                  :prefix-icon="Document"
                  size="large"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(confidentialityFormRef)" :loading="submitting.state"> 注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="4">
          <div style="width: 100%;min-height: 272px;display: flex;flex-direction: column;align-items: center">
            <el-text type="success" >注册成功！</el-text>
            <img
                :src="SuccessGifSrc"
                width="100"
                height="100"
                alt="Girl has dropped her ice cream."
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="gotoLogin" :style="{justifyContent:currentStep>0&&currentStep!=4?'space-between':'right'}">
        <el-link type="primary" @click="backStep" v-if="currentStep>0&&currentStep!=4">上一步</el-link>
        <router-link to="/member/login" v-if="currentStep!=4">
          <el-link type="primary" >已有账号去登录>></el-link>
        </router-link>
        <router-link to="/member/login" v-else>
          <el-link type="primary" >立即登录>></el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {reactive, ref, onMounted, computed, watch} from "vue";
import {User, Lock, Message, Iphone, EditPen,Document} from "@element-plus/icons-vue";
import Code from "@/components/Icon/Code.vue";
import success8 from "@/assets/img/success8.gif"
import {userInfoStore} from "@/sort/sorts/login.js"
import {encrypt} from "@/utils/jsencrpyt"
import {errorTools, successTools} from "@/utils/Tools";

const sort=userInfoStore()
const router = useRouter();
// 注册成功动态图片
const SuccessGifSrc=ref(success8+ "?" + +new Date())
// 当前步骤 账号密码-->邮箱/手机号-->设置密保-->完成
//            0         1           2       3
let currentStep = ref(1);
// 初始化accountForm ref
const accountFormRef = ref(null);
// 初始化 emailPhoneFormRef
const emailPhoneFormRef = ref(null);
// 初始化 confidentialityFormRef
const confidentialityFormRef = ref(null);


// 账号密码表单内容
const accountForm = reactive({
  userName: "",
  password: "",
  confirmPassword: "",
});
// 邮箱、手机号表单内容
const emailPhoneForm = reactive({
  email: "",
  emailCode: "",
  phone: "",
  phoneCode: "",
});
// 密保表单内容
const confidentialityForm = reactive({
  problemOne: "",
  answerOne: "",
  problemTwo: "",
  answerTwo: "",
});


// 账号密码表单规则
const accountRules = reactive({
  userName: [
    {required: true, message: '请输入用户名!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 规则：账号必须是字母开头，可以包含字母、数字、下划线，长度在3到16个字符之间
        const accountRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
        if (!accountRegex.test(value)) {
          callback(new Error('账号必须是字母开头，可以包含字母、数字、下划线，长度在3到16个字符之间'))
        } else {
          callback()
        }
        // console.log(rule, value, callback)
      },
      trigger: "change"
    }
  ],
  password: [
    {required: true, message: '请输入密码!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 规则：密码可以由字母、数字、下划线组成，至少包含一个字母和一个数字，长度在8到16个字符之间
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
        if (!passwordRegex.test(value)) {
          callback(new Error('密码可以由字母、数字、下划线组成，至少包含一个字母和一个数字，长度在8到16个字符之间'))
        } else {
          callback()
        }
        // console.log(rule, value, callback)
      },
      trigger: "change"
    }
  ],
  confirmPassword: [
    {required: true, message: '请再次输入密码!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // rule：采用的规则
        // value: 被校验的值
        // callback是回调函数，
        //      如果通过了规则检验，就直接调用callback()
        //      如果没有通过规则检验，就调用callback(错误对象，在错误对象中说明原因)
        //         例如：callback(new Error('错误说明'))
        if (value != accountForm.password) {
          callback(new Error('两次密码输入不相符'))
        } else {
          callback()
        }
        // console.log(rule, value, callback)
      },
      trigger: "change"
    }
  ]
})
// 邮箱、手机号表单规则
const emailPhoneRules = reactive({
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
  emailCode:[
    {
      validator(_, value, callback) {
        const emailRegex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/ ;

        if (emailRegex.test(emailPhoneForm.email)&&value.length!=4) {
          callback(new Error('请正确输入邮箱验证码'))
        }else if ((!emailRegex.test(emailPhoneForm.email))&&value.length!=0){
          callback(new Error('请勿输入验证码'))
        } else {
          callback()
        }
      },
      trigger: "change"
    }
  ],
  phone: [
    // {required: true, message: '请输入手机号码!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 手机号正则
        const phoneRegex = /^1[3-9]\d{9}$/;
        if ((!phoneRegex.test(value))&&value!="") {
          phoneBtn.disabled=true;
          callback(new Error('请输入正确手机号'))
        } else {
          value==""?phoneBtn.disabled=true: phoneBtn.disabled=false;
          callback()
        }
      },
      trigger: "change"
    }
  ],
  phoneCode:[
    {
      validator(_, value, callback) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (phoneRegex.test(emailPhoneForm.phone)&&value.length!=4) {
          callback(new Error('请正确输入手机验证码'))
        }else if ((!phoneRegex.test(emailPhoneForm.phone))&&value.length!=0){
          callback(new Error('请勿输入验证码'))
        } else {
          callback()
        }
      },
      trigger: "change"
    }
  ]
})
// 密保表单规则
const confidentialityRules = reactive({
  problemOne: [
    {required: true, message: '请输入密保问题一', trigger: 'change'},
  ],
  answerOne: [
    {required: true, message: '请输入密保答案一', trigger: 'change'},
  ],
  problemTwo: [
    {required: true, message: '请输入密保问题二', trigger: 'change'},
  ],
  answerTwo: [
    {required: true, message: '请输入密保答案二', trigger: 'change'},
  ]
})

// 邮箱验证码按钮属性
const emailBtn=reactive({
  type:"primary",
  btnText:"获取验证码",
  disabled: true,
})
// 手机验证码按钮属性
const phoneBtn=reactive({
  type:"primary",
  btnText:"获取验证码",
  disabled: true,
})

// 正在提交的按钮状态
let submitting=reactive({
  state:false,
  text:"注册中"
});

// 下一步
function nextStep(formEl) {
  formEl.validate(valid => {
    if (valid) {
      // 如果ref为注册的话 发请求
      if(formEl==confidentialityFormRef.value){
        submitting.state=true
        submitting.text="注册中"
        setTimeout(()=>{
          currentStep.value=4
          submitting.state=false
          submitting.text="注册"
          const form ={
            userName:accountForm.userName,
            password:encrypt(accountForm.password),
            isRememberPassword:true
          }
          sort.setuserInfo(form)
        },1000)
      }else if (formEl==emailPhoneFormRef.value){
        if (emailPhoneForm.emailCode!="1234"){
          return errorTools("验证码错误");
        }else if (emailPhoneForm.phoneCode!="1234"){
          return errorTools("验证码错误");
        }
      }
      else{
        currentStep.value++;
      }

    }
  })

}
// 上一步
function backStep() {
  currentStep.value--
}
// 获取邮箱验证码
function getEmailCode(EL){
  EL.type="";
  EL.disabled = true;
  EL.btnText = "请稍候...";
  // 延迟500毫秒
  setTimeout(() => {
    doLoop(60,EL);
  }, 500);
}
// 手机验证码的倒计时
function doLoop(seconds,EL) {
  successTools("验证码已发送!")
  seconds = seconds ? seconds : 60;
  EL.btnText = seconds + "s后获取";
  setTimeout(()=>{
    if (seconds > 0) {
      EL.btnText = seconds + "s后获取";
      --seconds;
    }
  },1000)
  let countdown = setInterval(() => {
    if (seconds > 0) {
      EL.btnText = seconds + "s后获取";
      --seconds;
    } else {
      EL.btnText = "获取验证码";
      EL.disabled = false;
      EL.type="primary";
      clearInterval(countdown);
    }
  }, 1000);
}

// accountForm.userName监听器
watch(() => accountForm.userName, (newCount, oldCount) => {
  const accountRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  if (newCount.length == 1) {
    document.querySelector(".user_name").parentNode.parentNode.style.marginBottom = "29px";
  } else if (newCount.length == 0) {
    document.querySelector(".user_name").parentNode.parentNode.style.marginBottom = "18px";
  } else {
    if (accountRegex.test(newCount)) {
      document.querySelector(".user_name").parentNode.parentNode.style.marginBottom = "18px";
    } else {
      document.querySelector(".user_name").parentNode.parentNode.style.marginBottom = "29px";
    }
  }
})
// accountForm.password监听器
watch(() => accountForm.password, (newCount, oldCount) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
  if (newCount.length == 1) {
    document.querySelector(".password").parentNode.parentNode.style.marginBottom = "41px";
  } else if (newCount.length == 0) {
    document.querySelector(".password").parentNode.parentNode.style.marginBottom = "18px";
  } else {
    if (passwordRegex.test(newCount)) {
      document.querySelector(".password").parentNode.parentNode.style.marginBottom = "18px";
    } else {
      document.querySelector(".password").parentNode.parentNode.style.marginBottom = "41px";
    }
  }
})
</script>
<style lang="scss" scope>
.register {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;

  .registerContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .register_steps {
      width: 350px;
      margin-bottom: 10px;
      margin-top: 5px;
    }

    .myForm {
      width: 250px;

      .codeIcon {
        cursor: text;
      }

      .emailCode,.phoneCode {
        width: 100%;
        display: flex;
        align-items: center;
        .divider{
          width: 1.5px;
          height: 25px;
          background: #dcdfe6;
          position: absolute;
          right: 90px;
        }
        .btnCode{
          min-width: 70px;
          text-align: center;
          position: absolute;
          right: 8px;
        }
      }
    }

    .gotoLogin {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 250px;
    }

  }
}
</style>
