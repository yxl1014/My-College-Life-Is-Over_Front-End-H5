<template>
  <div class="mySidebar">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu
        :default-active="currentRouterPath"
        router
        class="el-menu-vertical-demo"
        :collapse="sort.sidebarState"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-menu-item index="/index">
        <el-icon>
          <HomeFilled/>
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="/home">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>Navigator Two</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="/home/A">A</el-menu-item>
          <el-menu-item index="/home/B">B</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>

      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>Navigator Three</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw, watch} from "vue";
import {Menu as IconMenu} from "@element-plus/icons-vue";
import {sidebarStore} from "@/sort/sort_example/sidebarState.js";
import {useRoute, useRouter} from "vue-router"
const sort = sidebarStore();

const route = useRoute();
const router = useRouter()
let currentRouterPath = ref(toRaw(router).currentRoute.value.fullPath)
// console.log(toRaw(router).currentRoute.value.fullPath);

// 是否折叠菜单栏
const isCollapse = ref(false);

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath);
};

watch(route, () => {
  currentRouterPath.value = toRaw(router).currentRoute.value.fullPath
})
</script>

<style lang="scss">
.mySidebar {
  height: calc(100vh - 45px);
  background: var(--sidebar-background);
  border-right: 1px solid var(--sidebar-background);
}
</style>
