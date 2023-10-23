<template >
    <div class="container">
        <el-image style="width: 60px; height: 60px" :src="logoUrl" fit="contain" />
        <span>LoadRunnerX</span>
    </div>
</template>
<script setup>
import url from "@/assets/img/logo_transparent.png"
import { ref } from "vue"
const logoUrl=ref(url + "?" + +new Date());
</script>
<style lang="scss" scope>
.container{
    width: 100%;
    height: 100%;
    background: white;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    span{
        margin-left: 10px;
    }
}
    
</style>