<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-container>
          <el-aside :width="sort.sidebarState?'65px':'200px'" style="aaa">
            <Sidebar />
          </el-aside>
          <el-container direction="vertical">
            <div class="MyPageHeader" >
              <PageHeader />
            </div>
            <el-main>
              <MainContext />
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
import { sidebarStore } from "@/sort/sort_example/sidebarState.js";
const sort = sidebarStore();
</script>
<style lang="scss">
// 修改Header组件的样式
.el-header {
  padding: 0;
  height: 45px;
}
//重写 el-aside的延迟方式
.el-aside{
    transition: width .28s !important;
    overflow-x: hidden;
}
.el-menu{
  background: #d9ecff;
}

.MyPageHeader {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
</style>
