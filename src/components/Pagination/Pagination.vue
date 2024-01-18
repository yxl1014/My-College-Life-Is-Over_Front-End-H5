<script setup>
import {defineProps, ref,computed} from "vue"

const emit = defineEmits(['pagination','update:pageSize', 'update:pageNum'])
const props = defineProps(["pageNum", "pageSize", "total"])
const total = ref(props.total)

const handleChange = () => {
  if (pageNum.value > Math.ceil(total.value / pageSize.value)){
    pageNum.value=1
  }
  emit("pagination")
}
const pageSize= computed({
  get(){
    return props.pageSize
  },
  set(newVal){
    emit('update:pageSize', newVal)
  }
})
const pageNum=computed({
  get(){
    return props.pageNum
  },
  set(newVal){
    emit("update:pageNum",newVal)
  }
})
</script>

<template>
  <div style="width: 100%;height: 50px;display: flex;align-items: center;font-size: 13px;justify-content: right;">
    <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="pageNum"
        v-model:total="total"
        :page-sizes="[10, 20, 30]"
        background
        layout="total,sizes, prev, pager, next"
        @size-change="handleChange"
        @current-change="handleChange"
    />
  </div>
</template>

<style scoped lang="scss">

</style>