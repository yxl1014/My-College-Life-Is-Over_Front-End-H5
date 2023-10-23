<template>
  <div>
    <div style="width: 200px">
      <el-input v-model="form.userName" placeholder="请输入账号" clearable />
      <el-input
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </div>

    <el-select v-model="selectValue" clearable placeholder="请选择角色">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div
      style="
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      "
    >
      <el-input
        v-model="form.code"
        placeholder="请输入验证码"
        clearable
        style="width: 100px"
      />
      <el-image
        :lazy="true"
        style="width: 80px; height: 30px"
        :src="CodeImg"
        fit="fill"
      />
    </div>
    <el-button type="primary" @click="submit">登录</el-button>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { userStore } from "@/sort/sort_example/test_sort.js";
import { reactive, ref, onMounted } from "vue";
import { getCodeImg } from "@/api/login/login.js";
const router = useRouter();
const sort = userStore();
let CodeImg = ref("");
const form = reactive({
  code: "",
  userName: "",
  password: "",
});
const options = [
  {
    value: "1",
    label: "admin",
  },
  {
    value: "2",
    label: "user",
  },
];
const selectValue = ref("");
function submit() {
  const obj = {
    userName: form.userName,
    password: form.password,
  };
  sort.setInfo(obj);
  sort.setBankType(selectValue);
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
</style>
