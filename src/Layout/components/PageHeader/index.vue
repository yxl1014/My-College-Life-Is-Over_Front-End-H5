<template>
  <el-page-header>
    <template #breadcrumb>
      <div>
        <el-icon v-if="sort.sidebarState" class="icon" @click="updateSidebarState(!sort.sidebarState)"><Expand /></el-icon>
        <el-icon v-if="!sort.sidebarState" class="icon" @click="updateSidebarState(!sort.sidebarState)"><Fold /></el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: './page-header.html' }">
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="./page-header.html">route 1</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>route 2</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> Title </span>
    </template>
  </el-page-header>
</template>
<script setup>
import { sidebarStore } from "@/sort/sort_example/sidebarState.js";
const sort = sidebarStore();
  const updateSidebarState=sort.setSidebarState
</script>
<style lang="scss" scope>
.icon{
  font-size: 1.5em;
  cursor: pointer;
}
</style>
