<script setup>
import {ref} from "vue"
import {Search} from "@element-plus/icons-vue";
import svgImageNames from "./readFileName"
import Svgicon from "@/components/SvgIcon/Svgicon.vue";

const props = defineProps(["selectIcon"])
const emit = defineEmits(["selectedIcon"])
const searchIconName = ref("")
const iconList = ref(svgImageNames)
/**
 * 通过搜索图标名称，过滤图标列表
 */
const filterIcon = () => {
  console.log(searchIconName.value)
  // Object.assign(iconList, xxx)
  iconList.value = svgImageNames
  if (searchIconName.value) {
    const filterRes = iconList.value.filter((item) => {
      return item.includes(searchIconName.value)
    })
    // Object.assign(iconList, filterRes)
    iconList.value = filterRes
  }
}
/**
 * 选定图表
 * @param iconName 图标名称
 */
const handleSelectIcon = (iconName) => {
  // 调用父组件方法进行传值
  emit('selectedIcon', iconName)
}
</script>

<template>
  <div class="IconListContainer">
    <el-input v-model="searchIconName" @input="filterIcon" placeholder="请输入图标名称" :suffix-icon="Search" style="width: 100%;margin-bottom: 10px"/>
    <div class="scrollBar">
      <div class="iconItemBox" v-for="item in iconList">
        <div class="iconItem" :class="{iconItemActive:item==props.selectIcon}" @click="handleSelectIcon(item)">
          <svgicon :icon-class="item" class="icon"/>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.IconListContainer {
  width: 100%;

  .scrollBar {
    width: 100%;
    height: 200px;
    overflow: auto;
    display: flex;
    //align-items: center;
    flex-wrap: wrap;

    .iconItemBox {
      width: calc(100% / 3);
      height: 26px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .iconItem {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 3px 10px;

        &:hover {
          background: #8C939D66;
          border-radius: 5px;
        }

        .icon {
          width: 20px;
          height: 20px;
        }
      }

      .iconItemActive {
        background: #8C939D66;
        border-radius: 5px;
      }
    }
  }

}
</style>