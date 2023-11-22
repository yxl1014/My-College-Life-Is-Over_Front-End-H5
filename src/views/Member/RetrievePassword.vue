<template>
  <div class="RetrievePassword">
    <div class="RetrievePasswordContainer">
      <span class="title">LoadRunnerX 密码找回</span>
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
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(accountFormRef)"> 下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :name="0.5">
          <div class="RPMethod">
            <div class="PRitem" @click="currentStep=1">
              <el-button bg size="large" style="font-size: 18px"> 密保找回</el-button>
            </div>
            <div class="PRitem" @click="currentStep=2">
              <el-button bg size="large" style="font-size: 18px"> 邮箱找回</el-button>
            </div>
            <div class="PRitem" @click="currentStep=3">
              <el-button bg size="large" style="font-size: 18px"> 手机找回</el-button>
            </div>
          </div>
        </el-tab-pane>
        <!--        密保找回-->
        <el-tab-pane :name="1">
          <el-form :model="confidentialityForm" ref="confidentialityFormRef" :rules="confidentialityRules" class="myForm">
            <el-form-item>
              <el-text tag="b">{{ confidentialityForm.problemOne }}</el-text>
            </el-form-item>
            <el-form-item prop="answerOne">
              <el-input
                  v-model.trim="confidentialityForm.answerOne"
                  placeholder="请输入密保答案一"
                  :prefix-icon="Document"
                  size="large"
                  maxlength="4"
              />
            </el-form-item>
            <el-form-item>
              <el-text tag="b">{{ confidentialityForm.problemTwo }}</el-text>
            </el-form-item>
            <el-form-item prop="answerTwo">
              <el-input
                  v-model.trim="confidentialityForm.answerTwo"
                  placeholder="请输入密保答案二"
                  :prefix-icon="Document"
                  size="large"
                  maxlength="4"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(confidentialityFormRef)"> 下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--        邮箱找回-->
        <el-tab-pane :name="2">
          <el-form ref="emailPhoneFormRef" :model="emailPhoneForm" :rules="emailPhoneRules" class="myForm">
            <el-form-item prop="email">
              <el-input
                  v-model.trim="emailPhoneForm.email"
                  placeholder="请输入邮箱"
                  clearable
                  :prefix-icon="Iphone"
                  size="large"
              />
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
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(emailPhoneFormRef)"> 下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--        手机号找回-->
        <el-tab-pane :name="3">
          <el-form ref="emailPhoneFormRef" :model="emailPhoneForm" :rules="emailPhoneRules" class="myForm">
            <el-form-item prop="phone">
              <el-input
                  v-model.trim="emailPhoneForm.phone"
                  placeholder="请输入手机号"
                  clearable
                  :prefix-icon="Iphone"
                  size="large"
              />
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
        <!--        设置新密码-->
        <el-tab-pane :name="5">
          <el-form ref="newPasswordFormRef" :model="newPasswordForm" :rules="newPasswordFormRules" class="myForm">
            <el-form-item prop="password">
              <el-input
                  v-model.trim="newPasswordForm.password"
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
                  v-model.trim="newPasswordForm.confirmPassword"
                  placeholder="请再次输入密码"
                  type="password"
                  clearable
                  show-password
                  :prefix-icon="Lock"
                  size="large"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" style="width: 100%;" @click="nextStep(newPasswordFormRef)"> 确认</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="gotoLogin" :style="{justifyContent:currentStep>0?'space-between':'right'}">
        <el-link type="primary" @click="backStep" v-if="currentStep>0">上一步</el-link>
        <router-link to="/member/login">
          <el-link type="primary">去登录>></el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {reactive, ref, onMounted, computed, watch} from "vue";
import {User, Lock, Message, Iphone, EditPen, Document} from "@element-plus/icons-vue";
import Code from "@/components/Icon/Code.vue";
import success8 from "@/assets/img/success8.gif"
import {userInfoStore} from "@/sort/sorts/login.js"
import {encrypt} from "@/utils/jsencrpyt"
import {errorTools, successTools} from "@/utils/Tools";

const sort = userInfoStore()
const router = useRouter();
// 注册成功动态图片
const SuccessGifSrc = ref(success8 + "?" + +new Date())
// 当前步骤 账号密码-->邮箱/手机号-->设置密保-->完成
//            0         1           2       3
let currentStep = ref(0);
// 初始化accountForm ref
const accountFormRef = ref(null);
// 初始化 emailPhoneFormRef
const emailPhoneFormRef = ref(null);
// 初始化 confidentialityFormRef
const confidentialityFormRef = ref(null);
// 新密码
const newPasswordFormRef = ref("");

// 账号密码表单内容
const accountForm = reactive({
  userName: "",
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
  problemOne: "我的手机号是？",
  answerOne: "",
  problemTwo: "我的邮箱是？",
  answerTwo: "",
});
// 新密码内容
const newPasswordForm = reactive({
  password: "",
  confirmPassword: ""
})

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
})
// 邮箱、手机号表单规则
const emailPhoneRules = reactive({
  email: [
    {required: true, message: '请输入邮箱!', trigger: 'change'},
    {
      validator(_, value, callback) {
        // 邮箱正则
        const emailRegex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/;
        if ((!emailRegex.test(value)) && value != "") {
          emailBtn.disabled = true;
          callback(new Error('请输入正确邮箱'))
        } else {
          value == "" ? emailBtn.disabled = true : emailBtn.disabled = false;
          callback()
        }
      },
      trigger: "change"
    }
  ],
  emailCode: [
    {
      validator(_, value, callback) {
        const emailRegex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/;

        if (emailRegex.test(emailPhoneForm.email) && value.length != 4) {
          callback(new Error('请正确输入邮箱验证码'))
        } else if ((!emailRegex.test(emailPhoneForm.email)) && value.length != 0) {
          callback(new Error('请勿输入验证码'))
        } else {
          callback()
        }
      },
      trigger: "change"
    }
  ],
  phone: [
    {required: true, message: '请输入手机号码!', trigger: 'change'},
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
  phoneCode: [
    {
      validator(_, value, callback) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (phoneRegex.test(emailPhoneForm.phone) && value.length != 4) {
          callback(new Error('请正确输入手机验证码'))
        } else if ((!phoneRegex.test(emailPhoneForm.phone)) && value.length != 0) {
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
  answerOne: [
    {required: true, message: '请输入密保答案一', trigger: 'change'},
  ],
  answerTwo: [
    {required: true, message: '请输入密保答案二', trigger: 'change'},
  ]
})
// 新密码规则
const newPasswordFormRules = reactive({
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
        if (value != newPasswordForm.password) {
          callback(new Error('两次密码输入不相符'))
        } else {
          callback()
        }
      },
      trigger: "change"
    }
  ]
})


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

// 正在提交的按钮状态
let submitting = reactive({
  state: false,
  text: "注册中"
});

// 下一步
function nextStep(formEl) {
  formEl.validate(valid => {
    if (valid) {
      if (formEl == accountFormRef.value) {
        currentStep.value = 0.5
      } else if (formEl == confidentialityFormRef.value) {
        //   发送请求 验证密保是否正确
        if (confidentialityForm.answerOne.length != 0 && confidentialityForm.answerTwo.length != 0) {
          currentStep.value = 5
        } else {
          errorTools("请输入的密保答案不正确！");
        }
      } else if (formEl == emailPhoneFormRef.value) {
        console.log("sb")
        if (emailPhoneForm.phoneCode == 1234 || emailPhoneForm.emailCode == 1234) {
          console.log(emailPhoneForm.emailCode)
          currentStep.value = 5
        } else {
          errorTools("验证码错误！")
        }
      } else if (formEl == newPasswordFormRef.value) {
        successTools("修改密码成功!");
        router.replace("/member/login")
      }
    }
  })

}

// 上一步
function backStep() {
  if (currentStep.value == 1|| currentStep.value == 2|| currentStep.value == 3){
    currentStep.value = 0.5
  }else if (currentStep.value==0.5){
    currentStep.value = 0
  }else {
    rest([emailPhoneForm,confidentialityForm])
    currentStep.value=0.5
  }
}

// 获取邮箱验证码
function getEmailCode(EL) {
  EL.type = "";
  EL.disabled = true;
  EL.btnText = "请稍候...";
  // 延迟500毫秒
  setTimeout(() => {
    doLoop(60, EL);
  }, 500);
}

// 验证码的倒计时
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
watch(() => newPasswordForm.password, (newCount, oldCount) => {
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

function rest(FormArr){
  FormArr.forEach((item)=>{
    for (const itemKey in item) {
      item[itemKey] = "";
    }
  })
}
</script>
<style lang="scss" scope>
.RetrievePassword {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;

  .RetrievePasswordContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .tabs {
      width: 100%;
      min-height: 252px;
      margin-top: 10px;

      .RPMethod {
        width: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .PRitem {
          margin-top: 30px;
        }
      }
    }


    .myForm {
      width: 250px;

      .codeIcon {
        cursor: text;
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

    .gotoLogin {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 250px;
    }

  }
}
</style>
