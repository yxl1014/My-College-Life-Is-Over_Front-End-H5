<template>
  <div class="loginBG">
    <div class="content">
      <div class="module">
        <div class="BG">
          <el-image style="width: 100%; height: 100%" :src="loginBG" :fit="fit"/>
        </div>
        <div class="login">
          <div class="loginContainer">
            <span class="title">欢迎登录 LoadRunnerX 压力测试平台</span>
            <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
              <el-tab-pane label="密码登陆" name="first">
                <el-space direction="vertical" :size="15" alignment="normal" style="width: 100%;">
                  <el-input
                      v-model="form.userName"
                      placeholder="请输入用户名"
                      clearable
                      :prefix-icon="User"
                      size="large"
                      style="width: 100%;"
                  />
                  <el-input
                      v-model="form.password"
                      placeholder="请输入密码"
                      type="password"
                      clearable
                      :prefix-icon="Lock"
                      size="large"
                  />
                </el-space>
              </el-tab-pane>
              <el-tab-pane label="短信登录" name="second">短信登录</el-tab-pane>
              <el-tab-pane label="邮箱登陆" name="third">邮箱登陆</el-tab-pane>
            </el-tabs>
            <div class="publicModule">
              <el-space direction="vertical" :size="15" alignment="normal">
                <div class="codeImg">
                  <div class="codeInput">
                    <el-input
                        v-model="code"
                        placeholder="请输入验证码"
                        clearable
                        size="large"
                    />
                  </div>
                  <div class="codePicture">
                    <el-image :lazy="true" style="width: 100%;height: 100%" :src="CodeImg" fit="fill"/>
                  </div>
                </div>
                <div class="operate">
                  <div>
                    <el-checkbox v-model="form.isRememberPassword" label="记住密码" size="small"/>
                  </div>
                  <div>
                    <el-link href="">忘记密码?</el-link>
                  </div>
                </div>
                <el-button type="primary" size="large" class="loginBtn" @click="submit">登录</el-button>
                <div class="gotoRegister">
                  <el-link type="primary" href="">没有账号我要免费注册>></el-link>
                </div>
              </el-space>
            </div>
          </div>
        </div>
      </div>
      <div class="partners">
        <el-image :src="cctv" style="height: 100%;opacity: 0.3" :lazy="true"/>
      </div>
      <div class="copyright">
        <el-text>版权所有 © 2023-2024天津市压力测试平台小组</el-text>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {userInfoStore} from "@/sort/sorts/login.js";
import {reactive, ref, onMounted} from "vue";
import {getCodeImg} from "@/api/login/login.js";
import loginBG from "@/assets/img/loginBG.png"
import {User, Lock} from "@element-plus/icons-vue";
import cctv from "@/assets/img/cctv.png"

const router = useRouter();
const sort = userInfoStore();

let CodeImg = ref("");
const form = reactive({
  // 是否记住密码
  isRememberPassword: sort.userInfo.isRememberPassword,
  userName: sort.userInfo.userName,
  password: sort.userInfo.password,
});
const code = ref("")

const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event)
}

function submit() {
  /*
  * 发送网络请求返回200的时候 做以下的操作
  * 非200的情况 弹窗说明原因
  * */
  // 如果勾选了 记住密码 把账号密码放进缓存
  if (form.isRememberPassword) {
    console.log("123")
    sort.setuserInfo(form);
  } else {
    console.log("456")
    const form = {userName: "", password: "", isRememberPassword: false}
    sort.setuserInfo(form)
  }
  // 把token放到本地缓存
  sort.setToken("gkopsklgsnklgjsl");
  // 跳转到主页面
  router.replace("/index");
}

onMounted(() => {
  getCodeImg().then((res) => {
    if (res.code == 200) {
      CodeImg.value = "data:image/gif;base64," + res.img;
      console.log(CodeImg);
    }
    console.log(res);
  });
});
</script>
<style lang="scss" scope>
.loginBG {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #337ECC, #337ECCB5);

  .content {
    position: absolute;
    top: 100px;
    right: 100px;
    width: 800px;
    height: 500px;

    .module {
      width: 100%;
      height: 90%;
      background: white;
      display: flex;
      align-items: center;

      .BG {
        flex: 1;
        height: 100%;
      }

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

          }

          .publicModule {
            width: 250px;

            .codeImg {
              display: flex;
              align-items: center;
              justify-content: space-evenly;

              .codeInput {
                flex: 1;
              }

              .codePicture {
                height: 40px;
                flex: 1;
                margin-left: 15px;
              }
            }

            .operate {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }

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
    }

    .partners {
      width: 100%;
      height: 5%;
    }

    .copyright {
      width: 100%;
      height: 5%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
