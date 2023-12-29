<template>
  <el-page-header @back="onBack">
    <template #breadcrumb>
      <div>
        <el-icon v-if="sort.sidebarState" class="icon" @click="updateSidebarState(!sort.sidebarState)">
          <Expand/>
        </el-icon>
        <el-icon v-if="!sort.sidebarState" class="icon" @click="updateSidebarState(!sort.sidebarState)">
          <Fold/>
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="index" :to="{ path:item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> {{getPageName()}} </span>
    </template>
  </el-page-header>
</template>
<script setup>
import {sidebarStore} from "@/sort/sort_example/sidebarState.js";
import {onBeforeMount,watch,reactive,ref} from "vue";
import { useRoute ,useRouter} from "vue-router";
const route = useRoute();
const router = useRouter();
const sort = sidebarStore();
const updateSidebarState = sort.setSidebarState

let breadList = ref([])

onBeforeMount(()=>{
  getBreadcrumb()
})
watch(route,()=>{
  getBreadcrumb();
})

function getBreadcrumb() {
  // console.log(route.matched)
  if (Object.keys(route.matched[0].meta).length > 0) {
    breadList.value = route.matched
  } else {
    breadList.value = []
  }
  // console.log("breadList",breadList.value)
}
function getPageName() {
  return route.matched[route.matched.length-1].meta.title
}
function onBack(){
  router.go(-1)
}
</script>
<style lang="scss" scoped>
.icon {
  font-size: 1.5em;
  cursor: pointer;
}
</style>
