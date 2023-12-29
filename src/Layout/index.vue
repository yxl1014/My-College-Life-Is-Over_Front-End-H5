<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-container>
          <el-aside :width="sort.sidebarState?'65px':'200px'">
            <el-scrollbar>
              <Sidebar/>
            </el-scrollbar>
          </el-aside>
          <el-container direction="vertical">
            <div class="MyPageHeader">
              <PageHeader/>
            </div>
            <el-main>
              <el-scrollbar  class="contentScrollbar">
                <MainContext/>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script setup>
import MainContext from "@/Layout/components/MainContext/index.vue";
import Sidebar from "@/Layout/components/Sidebar/index.vue";
import Header from "@/Layout/components/Header/index.vue";
import PageHeader from "@/Layout/components/PageHeader/index.vue";
import {sidebarStore} from "@/sort/sort_example/sidebarState.js";
import {computed, ref, onMounted, watch} from "vue"
import {useRoute} from "vue-router";

// onMounted(() => {
//   // 添加监听事件  只要浏览器高度发生变化就重新计算content的高度
//   window.addEventListener('resize', () => {
//     size.value = window.innerHeight - 45 - heightSize.value;
//   })
// })

const route = useRoute();
// const heightSize=ref(Object.keys(route.matched[0].meta).length > 0 ?  122: 108)
const sort = sidebarStore();
// const size = ref(window.innerHeight)
// 监听路由变化 从而改变 content的高度
// watch(route,()=>{
//   // 这个是可变高度
//   heightSize.value = Object.keys(route.matched[0].meta).length > 0 ? 122 :108
//   // console.log("aaa",heightSize.value)
//   size.value=window.innerHeight - 45 - heightSize.value;
// },{immediate : true})
</script>
<style lang="scss">

.MyPageHeader {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 20px;
  box-shadow: 0px 0px 12px var(--MyPageHeader-shadow-color);
  background: var(--body-header-background);
}
.contentScrollbar{
  height: calc(100vh - 45px - 122px);
}
</style>
