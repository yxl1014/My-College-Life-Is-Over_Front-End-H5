<template>
  <div class="login">
    <div class="loginContainer">
      <span class="title">欢迎登录 LoadRunnerX 压力测试平台</span>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="密码登陆" name="first">
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
              <el-link href="">忘记密码?</el-link>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="second">短信登录</el-tab-pane>
        <el-tab-pane label="邮箱登陆" name="third">邮箱登陆</el-tab-pane>
      </el-tabs>
      <div class="publicModule">
        <el-space direction="vertical" :size="15" alignment="normal" style="width: 100%;">
          <el-button type="primary" size="large" class="loginBtn" @click="submit(accountFormRef)" :loading="loginState">{{filterLoginState(loginState)}}</el-button>
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
import {reactive, ref, onMounted,computed} from "vue";
import {getCodeImg,login} from "@/api/login/login.js";
import {User, Lock} from "@element-plus/icons-vue";
import {setToken} from "@/utils/auth";
import {encrypt,decrypt} from "@/utils/jsencrpyt";
// 初始化 获取图片验证码
onMounted(() => {
//   获取验证码
  getCode();
});

const router = useRouter();
const sort = userInfoStore();

// 初始化accountForm ref
const accountFormRef = ref(null);
let CodeImg = ref("");
// form表单内容
const form = reactive({
  // 是否记住密码
  isRememberPassword: sort.userInfo.isRememberPassword,
  userName: sort.userInfo.userName,
  password: decrypt(sort.userInfo.password),
  code: sort.userInfo.code,
  uuid:"",
});
// 初始化tabs
const activeName = ref('first')
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
// 登录按钮状态
const loginState=ref(false);



// 切换tabs
const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 提交表单
function submit(formRef) {
  // 判断表单是否满足验证要求
  formRef.validate(v => {
    if (v) {
      loginState.value=true
      /*
      * 发送网络请求返回200的时候 做以下的操作
      * 非200的情况 弹窗说明原因
      * */
      // 如果勾选了 记住密码 把账号密码放进缓存
      const loginForm ={
        username: form.userName,
        password:form.password,
        code:form.code,
        uuid:form.uuid
      }
      login(loginForm).then(res=>{
        if (res.code==200){
          if (form.isRememberPassword) {
            const cacheForm={
              ...form,
              password:encrypt(form.password),
              code:""
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
      }).catch((err)=>{
        console.log("errMsg--->",err.message)
        getCode()
      }).finally(()=>{
        loginState.value=false
      })

    }
  })
}

// 获取验证码
function getCode() {
  getCodeImg().then((res) => {
    if (res.code == 200) {
      CodeImg.value = "data:image/gif;base64," + res.img;
      form.uuid=res.uuid
    }
  });
}

// 登录状态 过滤器
const filterLoginState=computed(()=>{
  return (v)=>{
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
