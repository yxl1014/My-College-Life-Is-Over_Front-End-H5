<template>
  <div class="back">
    <div class="mainBox">
      <img class="leftImg" src="@/assets/img/OIF.jpeg">
      <div class="loginBox">
        <div style="width: 80%; text-align: center; word-wrap: break-word;">
          欢迎登陆&nbsp;LoadRunnerX&nbsp;压力测试平台
        </div>
        <my-login v-if="loginOrSign === true" @switch-login-mode="handleSwitchLoginMode"></my-login>
        <my-sign-up v-else @switch-login-mode="handleSwitchLoginMode"></my-sign-up>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyLogin from "../auth/myLogin.vue";
import MySignUp from "../auth/mySignUp.vue";
import { ref } from 'vue';

const loginOrSign = ref(true);
const handleSwitchLoginMode = () => {

  loginOrSign.value = !loginOrSign.value;
};
</script>
<style lang="scss" scope>
.back {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/img/R.png');
  /* 设置背景图片的 URL */
  background-size: cover;
  /* 图片充满容器并保持比例 */
}

.mainBox {
  width: 50%;
  height: 60%;
  position: absolute;
  left: 42%;
  top: 20%;
  display: flex;
}

.leftImg {
  width: 50%;
  height: 100%;
}

.loginBox {
  width: 50%;
  height: 100%;
  background-color: rgba($color: #ffffff, $alpha: 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
