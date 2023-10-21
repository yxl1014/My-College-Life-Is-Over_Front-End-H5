<script setup>
// 引入env配置文件
  const env=import.meta.env
  console.log("当前环境",env, env.VITE_BASE_API);
  console.log(process.env.NODE_ENV);
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
</style>
