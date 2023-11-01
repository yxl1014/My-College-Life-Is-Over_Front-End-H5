<template>
  <div class="container">
    <el-row :gutter="24" justify="space-between">
      <el-col :span="4">
        <div class="headerLogo">
          <el-image style="width: 45px; height: 45px" :src="logoUrl" fit="contain"/>
          <span>LoadRunnerX</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="headerFun">
          <el-button :icon="themeStyle.icon" circle @click="updateTheme"/>
          <span>看我变不变</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import url from "@/assets/img/logo_transparent.png"
import {ref,reactive} from "vue"
import {Sunny, Moon} from "@element-plus/icons-vue";
import {useDark, useToggle} from '@vueuse/core'

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