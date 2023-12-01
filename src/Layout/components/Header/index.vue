<template>
  <div class="container">
    <el-row :gutter="24" justify="space-between" style="display: flex;align-items: center;">
      <el-col :span="4">
        <div class="headerLogo">
          <el-image style="width: 45px; height: 45px" :src="logoUrl" fit="contain" />
          <span>LoadRunnerX</span>
        </div>
      </el-col>
      <el-col :span="8" style="display: flex;">
        <div style="width: 80%;">
          <el-input v-model="search.value" placeholder="Please input" v-on:blur="handleBlur" v-on:change="actionSearch"
            v-if="search.showInput === true" />
          <div v-if="search.value !== ''" style="background-color: aliceblue; width: 100%; height: 400%; ">

          </div>
        </div>
        <el-button :icon="search.icon" circle @click="showSearchInput" />
      </el-col>
      <el-col :span="1">
        <div class="headerFun">
          <el-button :icon="themeStyle.icon" circle @click="updateTheme" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import url from "@/assets/img/logo_transparent.png"
import { ref, reactive, createApp } from "vue"
import { Sunny, Moon, Search } from "@element-plus/icons-vue";
import { useDark, useToggle } from '@vueuse/core'
let search = reactive({
  value: '',
  icon: Search,
  showInput: false
});
let themeStyle = reactive({
  icon: Sunny,// Sunny||Moon
});
let isDark = useDark()
const toggleDark = useToggle(isDark)

function updateTheme() {
  console.log(isDark)
  // themeState.value = !(themeState.value)
  isDark = !(isDark)
  toggleDark()
  themeStyle.icon =
    isDark ? Moon : Sunny
}
function showSearchInput() {
  search.showInput = true
}
function handleBlur() {
  search.showInput = false
}
const router = useRouter();
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }


}
</style>