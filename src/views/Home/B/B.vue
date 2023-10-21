<template >
    <div>
        B标签
        <el-button type="primary" size="default" @click="getData">点击发送请求</el-button>
        
    </div>
</template>
<script setup>
import axios from "axios"
    const env=import.meta.env
    axios.defaults.baseURL=env.VITE_BASE_API
    function getData(){
        axios({
            url:"/students",
            method:"get"
        }).then((res)=>{
            console.log(res);
        })
    }
</script>
<style lang="scss" scope>
    
</style>