<script setup>
// 引入env配置文件
  const env=import.meta.env
  console.log("当前环境",env, env.VITE_BASE_API);
  console.log(process.env.NODE_ENV);
</script>

<template>
  <router-view class="xxx"></router-view>
</template>

<style lang="scss">
  *{
    padding: 0;
    margin: 0;  
    box-sizing: border-box;
  }
  .xxx{
    max-width: 100vw;
    // background: $baseBackgroundColor; 
  }
</style>
