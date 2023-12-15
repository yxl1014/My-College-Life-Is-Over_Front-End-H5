<template >
    <div>
        B标签
        <el-button type="primary" size="default" @click="getData">点击发送请求</el-button>
    </div>
</template>
<script setup>
  import {getCodeImg} from "@/api/login/login";
  import axios from "axios";
  const getData=()=>{
    // getCodeImg()
    axios({
      url:"http://192.168.1.49:8061/chat-server/chat-server/nsai/filter/chat-history.do",
      method:"post",
      headers:{
        "Chat-Auth":"cfbaee8e-cfd9-4a30-8cd4-49995703ddef"
      }
    }).then(res=>{
      console.log(res)
    })
  }

</script>
<style lang="scss" scope>
    
</style>