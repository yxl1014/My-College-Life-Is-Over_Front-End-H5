<template>
    <el-steps :active="active" :space="300" finish-status="success" align-cente>
        <el-step title="填写账号"></el-step>
        <el-step title="绑定"></el-step>
        <el-step title="密保问题"></el-step>
        <el-step title="完成注册"></el-step>
    </el-steps>
    <div class="box" v-if="active == 0">
        <el-input v-model="signup.userName" class="sizeAndSpacing" placeholder="请输入账号"></el-input>
        <el-input v-model="signup.password" type="password" show-password class="sizeAndSpacing"
            placeholder="请输入密码"></el-input>
        <el-input v-model="signup.rePassword" type="password" show-password class="sizeAndSpacing"
            placeholder="请确认密码"></el-input>
        <el-button type="primary" class="sizeAndSpacing" @click="next">下一步</el-button>
    </div>
    <div class="box" v-else-if="active == 1">
        <el-input v-model="signup.email" class="sizeAndSpacing" placeholder="请输入邮箱"></el-input>
        <div style="
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      " class="sizeAndSpacing">
            <el-input v-model="signup.emailCode" placeholder="请输入邮箱验证码" style="width:60%;border: none;height: 100%;" />
            <el-button style="width:40%; height: 100%" @click="pushEmail">获取验证码</el-button>
        </div>
        <el-input v-model="signup.phone" class="sizeAndSpacing" placeholder="请输入手机号"></el-input>
        <div style="
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      " class="sizeAndSpacing">
            <el-input v-model="signup.phoneCode" placeholder="请输入手机验证码" style="width:60%;border: none;height: 100%;" />
            <el-button style="width:40%; height: 100%" @click="pushEmail">获取验证码</el-button>
        </div>
        <el-button type="primary" class="sizeAndSpacing" @click="next">下一步</el-button>
    </div>
    <div class="box" v-else="active == 2">
        <el-input v-model="signup.questionOne" class="sizeAndSpacing" placeholder="请输入密保问题一"></el-input>
        <el-input v-model="signup.answerOne" class="sizeAndSpacing" placeholder="请输入密保答案一"></el-input>
        <el-input v-model="signup.questionTwo" class="sizeAndSpacing" placeholder="请输入密保问题二"></el-input>
        <el-input v-model="signup.answerTwo" class="sizeAndSpacing" placeholder="请输入密保答案二"></el-input>
        <el-button type="primary" class="sizeAndSpacing" @click="next"
            v-loading.fullscreen.lock="fullscreenLoading">下一步</el-button>
    </div>
    <div style=" width: 80%;display: flex;">
        <el-link type="primary" @click="last">上一步</el-link>
        <el-link type="primary" style="margin-left:10% ;" @click="switchLoginMode">已有账号，去登陆>></el-link>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from "vue-router";
import { userStore } from "@/sort/sort_example/test_sort.js";
import { reactive, ref, onMounted } from "vue";
import { getCodeImg } from "@/api/login/login.js";
import { ElLoading } from 'element-plus'

const fullscreenLoading = ref(false)
const emit = defineEmits(['switch-login-mode']);
const active = ref(0)
const signup = reactive({
    userName: "",
    password: "",
    rePassword: "",
    email: "",
    emailCode: "",
    phone: "",
    phoneCode: "",
    questionOne: "",
    answerOne: "",
    questionTwo: "",
    answerTwo: ""
});
const switchLoginMode = () => {
    emit("switch-login-mode");
};
const next = () => {
    if (active.value++ > 1) {
        fullscreenLoading.value = true
        setTimeout(() => {
            fullscreenLoading.value = false
            emit("switch-login-mode");
        }, 2000)

    }
}
const last = () => {
    if (active.value-- < 0) active.value = 0
}
</script>
<style>
.el-steps {
    display: flex;
    width: 100%;
    margin-left: 10%;
}

.el-step {
    /* 添加你的样式规则 */

}


.el-step__title {
    font-size: 5px;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 60%;
}

.sizeAndSpacing {
    margin-bottom: 5%;
    height: 10%;
    width: 80%;
}
</style>