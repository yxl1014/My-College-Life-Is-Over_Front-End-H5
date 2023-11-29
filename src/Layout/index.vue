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
              <el-scrollbar :height="size">
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
import {computed} from "vue"

const sort = sidebarStore();
const size = computed(() => {
  return document.documentElement.clientHeight - 45 - 98;
})
</script>
<style lang="scss">

.MyPageHeader {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  background: var(--body-header-background);
}
</style>
