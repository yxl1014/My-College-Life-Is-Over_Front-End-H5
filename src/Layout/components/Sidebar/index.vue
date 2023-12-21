<template>
  <div class="mySidebar">
    <el-menu
        :default-active="currentRouterPath"
        router
        class="el-menu-vertical-demo"
        :collapse="sort.sidebarState"
        :unique-opened="true"
    >
      <template v-for="(item,index) in routersData">
        <el-sub-menu v-if="item.children.length!==0" :key="index" :index="item.path">
          <template #title>
            <svg-icon :icon-class="item.icon" style="width: 25px;height: 25px;padding: 5px"/>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex" :index="childrenItem.path">
            <svg-icon :icon-class="childrenItem.icon" style="width: 25px;height: 25px;padding: 5px"/>
            <template #title>{{childrenItem.title}}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else  :index="item.path">
          <svg-icon :icon-class="item.icon" style="width: 25px;height: 25px;padding: 5px"/>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw, watch, onMounted,markRaw} from "vue";
import {sidebarStore} from "@/sort/sort_example/sidebarState.js";
import {useRoute, useRouter} from "vue-router"

const sort = sidebarStore();
const route = useRoute();
const router = useRouter()
const currentRouterPath = ref(toRaw(router).currentRoute.value.fullPath)
const routersData = reactive([])

onMounted(() => {
  const routersArr = []
  let routers = router.options.routes
  routers = routers.filter((item) => {
    return !item.hiddent
  })
  for (const item of routers) {
    const obj = {
      path: item.path,
      title: item.meta.title,
      icon: item.meta.icon,
      children: [],
    }
    if (item.children && item.path !== "") {
      for (const childrenItem of item.children) {
        const childrenObj = {
          path: item.path + "/"+childrenItem.path,
          title: childrenItem.meta.title,
          icon: childrenItem.meta.icon,
        }
        obj.children.push(childrenObj)
      }
    } else {
      obj.path = "/" + item.children[0].path
      obj.icon = item.children[0].meta.icon
    }
    routersArr.push(obj)
  }
  Object.assign(routersData, routersArr)
  console.log(routersData)
})

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
