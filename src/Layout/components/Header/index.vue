<template>
  <div class="container">
    <el-row :gutter="24" justify="space-between" style="display: flex;align-items: center;">
      <el-col :span="4">
        <div class="headerLogo">
          <el-image style="width: 45px; height: 45px" :src="logoUrl" fit="contain"/>
          <span>LoadRunnerX</span>
        </div>
      </el-col>
      <el-col :span="20">
        <div style="display: flex;align-items: center;justify-content: flex-end;padding: 0px 10px">
          <div style="display: flex;margin-right: 10px">
            <div style="width: 80%;">
              <!-- <el-input v-model="search.value" placeholder="Please input" v-on:blur="handleBlur" v-on:change="actionSearch"
                v-if="search.showInput === true" />
              <div v-if="search.value !== ''" style="background-color: aliceblue; width: 100%; height: 400%; "> -->
              <!-- </div> -->
              <el-select v-model="search.value" multiple filterable allow-create default-first-option :reserve-keyword="false"
                         placeholder="Please input" v-on:change="actionSearch" v-on:blur="handleBlur" v-if="search.showInput === true">
                <el-option v-for="item in matchingRoutes" :key="item.meta.title" :label="item.meta.title"
                           :value="item.path"/>
              </el-select>
            </div>
            <el-button :icon="search.icon" circle @click="showSearchInput"/>
          </div>
          <div class="headerFun" @click="updateTheme">
            <el-button v-if="isDark" :icon="Moon" circle/>
            <el-button v-else :icon="Sunny" circle/>
          </div>
          <el-dropdown trigger="click" placement="bottom-end" style="margin-right: 10px" v-if="token">
            <div class="el-dropdown-link" style="display: flex;align-items: end">
              <el-avatar shape="square" size="default" src="https://picsum.photos/200" style="border-radius: 18%"/>
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="User" @click="router.push('/user/personalCenter')">个人中心</el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton" divided @click="handlelogout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="primary" text @click="goLogin" v-else>立即登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
import url from "@/assets/img/logo_transparent.png"
import {ref, reactive, createApp, onMounted} from "vue"
import {Sunny, Moon, Search, Plus, SwitchButton, User} from "@element-plus/icons-vue";
import {useDark, useToggle} from '@vueuse/core'
import {themeModeStore} from "@/sort/sort_example/themeMode";
import {getToken, removeToken} from "@/utils/auth";
import {logout} from "@/api/login/login";
import {messageBox} from "@/utils/MessageBox";

const sort = themeModeStore()
let search = reactive({
  value: '',
  icon: Search,
  showInput: false
});
// 用户是否登录
let token = ref(getToken());
let isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter();
onMounted(() => {
  console.log(isDark)
  sort.updateThemeMode(isDark.value)
})

function updateTheme() {
  console.log(isDark)
  // isDark = !(isDark.value)
  toggleDark()
  sort.updateThemeMode(isDark.value)
}

function showSearchInput() {
  search.showInput = true
}

function handleBlur() {
  search.showInput = false
}

function actionSearch() {
  console.log(search.value)
  const searchRegex = new RegExp(search.value, 'i');

  // 遍历路由进行模糊搜索
  const matchingRoutes = [];

  function searchRoutes(routes) {
    for (const route of routes) {
      if (route.meta && route.meta.title && searchRegex.test(route.meta.title)) {
        matchingRoutes.push(route);
      }

      if (route.children) {
        searchRoutes(route.children);
      }
    }
  }

  searchRoutes(router.options.routes);

  // 处理匹配到的路由，你可以在这里更新组件状态或执行其他操作
  console.log(matchingRoutes);
}

// 去登录
const goLogin = () => {
  router.push("/member/login")
}
// 退出登陆
const handlelogout = () => {
  messageBox("是否要退出登录？").then(() => {
    const form = {
      uuid: getToken()
    }
    logout(form).then(res => {
      if (res.code === 200) {
        router.replace("/index")
        removeToken()
        token.value = getToken()
      }
    })
  }).catch(() => {

  })
}
const logoUrl = ref(url + "?" + +new Date());

</script>
<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background: var(--header-background);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  .headerLogo {
    display: flex;
    align-items: center;
    height: 100%;

    span {
      margin-left: 10px;
    }
  }

  .headerFun {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }


}
</style>