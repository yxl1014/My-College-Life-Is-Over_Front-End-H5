<template>
  <div class="loginBG">
    <div class="content">
      <div class="module">
        <div class="BG">
          <el-image style="width: 100%; height: 100%" :src="loginBG" :fit="fit"/>
        </div>
        <router-view class="memberContainer">

        </router-view>
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
import loginBG from "@/assets/img/loginBG.png"
import cctv from "@/assets/img/cctv.png"

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

      .memberContainer {
        flex: 1;
        height: 100%;
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
