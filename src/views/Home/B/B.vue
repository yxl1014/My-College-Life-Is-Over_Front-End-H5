<template >
    <div>
        B标签
        <el-button type="primary" size="default" @click="getData">点击发送请求</el-button>
        
    </div>
</template>
<script setup>
  import {getCodeImg} from "@/api/login/login";
  const getData=()=>{
    getCodeImg()
  }

</script>
<style lang="scss" scope>
    
</style>