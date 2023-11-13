<template>
    <el-tabs class="tabs-chose">
        <el-tab-pane label="密码登录">
            <el-input v-model="passwordForm.userName" placeholder="请输入账号" clearable
                style="width: 100%;border: none;margin-top: 5%;" class='sizeAndSpacing' />
            <el-input v-model="passwordForm.password" type="password" placeholder="请输入密码" show-password
                style="width: 100%;border: none;" class='sizeAndSpacing' />
            <div style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      " class='sizeAndSpacing'>
                <el-input v-model="passwordForm.code" placeholder="请输入验证码" style="width:60%;height: 100%;border: none;" />
                <el-image :lazy="true" style="width:40%; height: 32px;" :src="CodeImg" fit="fill" />
            </div>
            <div class="sizeAndSpacing" style="width: 100%;display: flex;justify-content: space-between;">
                <el-checkbox v-model="checked" label="记住账号" size="large" style="height: 100%;" />
                <el-link type="primary" style="height: 100%;">忘记密码</el-link>
            </div>
            <el-button type="primary" @click="submitPass" style="width: 100%;border: none;"
                class="sizeAndSpacing">登录</el-button>
            <router-view></router-view>
            <el-link type="primary" class="sizeAndSpacing" @click="switchLoginMode">没有账号，免费注册>></el-link>
        </el-tab-pane>
        <el-tab-pane label="短信登录">
            <el-input v-model="emailForm.userName" placeholder="请输入账号" clearable
                style="width: 100%;border: none;margin-top: 5%;" class="sizeAndSpacing" />
            <el-input v-model="emailForm.password" type="password" placeholder="请输入密码" show-password
                style="width: 100%;border: none;" class="sizeAndSpacing" />
            <div style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      " class="sizeAndSpacing">
                <el-input v-model="emailForm.code" placeholder="请输入验证码" style="width:60%;border: none;height: 100%;" />
                <el-button style="width:40%; height: 100%" @click="pushEmail">获取验证码</el-button>
            </div>
            <div class="sizeAndSpacing" style="width: 100%;display: flex;justify-content: space-between;">
                <el-checkbox v-model="checked" label="记住账号" size="large" style="height: 100%;" />
                <el-link type="primary" style="height: 100%;">忘记密码</el-link>
            </div>
            <el-button type="primary" @click="submitEmail" style="width: 100%;border: none;"
                class='sizeAndSpacing'>登录</el-button>
            <router-view></router-view>
            <el-link type="primary" class='sizeAndSpacing' @click="switchLoginMode">没有账号，免费注册>></el-link>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录">
            <el-input v-model="emailForm.userName" placeholder="请输入账号" clearable
                style="width: 100%;border: none;margin-top: 5%;" class="sizeAndSpacing" />
            <el-input v-model="emailForm.password" type="password" placeholder="请输入密码" show-password
                style="width: 100%;border: none;" class="sizeAndSpacing" />
            <div style="
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
      " class="sizeAndSpacing">
                <el-input v-model="emailForm.code" placeholder="请输入验证码" style="width:60%;border: none;height: 100%;" />
                <el-button style="width:40%; height: 100%" @click="pushEmail">获取验证码</el-button>
            </div>
            <div class="sizeAndSpacing" style="width: 100%;display: flex;justify-content: space-between;">
                <el-checkbox v-model="checked" label="记住账号" size="large" style="height: 100%;" />
                <el-link type="primary" style="height: 100%;">忘记密码</el-link>
            </div>
            <el-button type="primary" @click="submitEmail" style="width: 100%;border: none;"
                class='sizeAndSpacing'>登录</el-button>
            <router-view></router-view>
            <el-link type="primary" class='sizeAndSpacing' @click="switchLoginMode">没有账号，免费注册>></el-link>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from "vue-router";
import { userStore } from "@/sort/sort_example/test_sort.js";
import { reactive, ref, onMounted } from "vue";
import { getCodeImg } from "@/api/login/login.js";
const emit = defineEmits(['switch-login-mode']);
const router = useRouter();
const sort = userStore();
let CodeImg = ref("");
const passwordForm = reactive({
    code: "",
    userName: "",
    password: "",
});
const checked = ref('false');
const emailForm = reactive({
    code: "",
    userName: "",
    password: "",
});
const switchLoginMode = () => {
    emit("switch-login-mode");
};
function submitPass() {
    const obj = {
        userName: passwordForm.userName,
        password: passwordForm.password,
    };
    sort.setInfo(obj);
    sort.setToken("gkopsklgsnklgjsl");
    router.replace("/index");
}
function submitEmail() {
    const obj = {
        userName: emailForm.userName,
        password: emailForm.password,
    };
    sort.setInfo(obj);
    sort.setToken("gkopsklgsnklgjsl");
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
h1 {
    color: #bfa;
}


.sizeAndSpacing {
    margin-bottom: 5%;
    height: 10%;
}

.tabs-chose>.el-tabs__content {
    height: 60;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tabs-chose>.el-tabs__header {
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
</style>