<script setup>
import {ref, reactive} from "vue"
import Layout from "@/Layout/index.vue";
import Svgicon from "@/components/SvgIcon/Svgicon.vue";
import {Plus, Search} from "@element-plus/icons-vue";
import {messageBox} from "@/utils/MessageBox";
import {msgTools, successTools} from "@/utils/Tools";
import IconList from "@/views/System/MenuManagement/IconList.vue";

const tableData = reactive([
  // {
  //   id: "3",
  //   path: "/home",
  //   name: "主页面",
  //   component: Layout,
  //   redirect: "/home/A",
  //   meta: {title: "配置资源", icon: "menu"},
  //   sort: 1,
  //   status: true,
  //   createTime: "2022-10-11 12:49:52",
  //   children: [
  //     {
  //       id: "4",
  //       path: "A",
  //       component: () => import("@/views/ConfigureResources/A/A.vue"),
  //       meta: {title: "A", icon: "tools"},
  //       sort: 1,
  //       status: true,
  //       createTime: "2022-10-11 12:49:52",
  //     },
  //     {
  //       id: "5",
  //       path: "B",
  //       component: () => import("@/views/ConfigureResources/B/B.vue"),
  //       meta: {title: "B", icon: "upload-filled"},
  //       sort: 2,
  //       status: true,
  //       createTime: "2022-10-11 12:49:52",
  //     },
  //   ],
  // },
  {
    id: "8",
    path: "/system",
    component: Layout,
    redirect: "/system/menu",
    meta: {title: "系统设置", icon: "setting"},
    name: "system",
    sort: 2,
    status: true,
    createTime: "2022-10-11 12:49:52",
    children: [
      {
        id: "9",
        path: "menu",
        component: () => import("@/views/System/MenuManagement/MenuManagement.vue"),
        name: "menu",
        meta: {title: "菜单管理", icon: "menu"},
        sort: 1,
        status: false,
        createTime: "2022-10-11 12:49:52",
      }
    ]
  },
])
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: "",
  status: "",
})
const dialogStatus = ref(false)
const title = ref("新增菜单")
const formDialog = reactive({
  menuType: 0,
  parentNode: "1",
  icon: "",
  title:"",
  menuName: "",
  sort: 1,
  path:"",
  status:0,
  hiddent:0,
  redirect:"",
  src:"",
  query:"",

})
const menuOptions = reactive([
  {
    value: '1',
    label: '主目录',
    children: [
      {
        value: '2',
        label: '配置资源',
        children: [
          {
            value: '2-1',
            label: 'A',
          },
          {
            value: '2-2',
            label: 'B',
          },
        ],
      },
      {
        value: '3',
        label: '系统设置',
        children: [
          {
            value: '3-1',
            label: '菜单管理',
          },
        ],
      },
    ],
  }
])
const popoverStatus = ref(false)
/**
 * 新增路由
 * @param row 当前行数据
 */
const handleAddRouter = (row) => {
  console.log(row)
  title.value = "新增菜单";
  dialogStatus.value = true;
}
/**
 * 修改路由
 * @param row 当前行数据
 */
const handleUpdateRouter = (row) => {
  title.value = "修改菜单";
  dialogStatus.value = true;
}
/**
 * 删除路由
 * @param row 当前行数据
 */
const handleDelete = (row) => {
  messageBox("确定要删除当前路由").then(() => {
    successTools("操作成功")
  }).catch(() => {
    msgTools("操作取消")
  })
}

/**
 * 取消按钮函数
 */
const handleClose = () => {
  dialogStatus.value = false
}
/**
 * 确定按钮函数
 */
const handleSubmit = () => {
  dialogStatus.value = false
}
/**
 * 顶部 根据条件搜索路由函数
 */
const handleSearchRouter = () => {

}
/**
 * 重置表单
 */
const handleRest = () => {
  queryParams.name = ""
  queryParams.status = ""
}
/**
 * 选定图标
 * @param iconName 选定的图标
 */
const selectedIcon = (iconName) => {
  formDialog.icon = iconName
  popoverStatus.value = false
  console.log(formDialog.icon)
}
</script>

<template>
  <div class="container">
    <!--    头部 筛选查找-->
    <div>
      <el-form :model="queryParams" inline>
        <el-form-item label="菜单名称" style="margin-right: 10px">
          <el-input v-model="queryParams.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="auto">
          <el-select v-model="queryParams.status" placeholder="菜单状态">
            <el-option label="正常" value="0"/>
            <el-option label="禁用" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearchRouter">搜索</el-button>
          <el-button icon="Refresh" @click="handleRest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--    功能区-->
    <div style="margin-bottom: 5px">
      <el-button type="primary" :icon="Plus" @click="handleAddRouter">新增</el-button>
    </div>
    <!--    展示区-->
    <el-table :data="tableData" row-key="id" class="menuTable">
      <el-table-column show-overflow-tooltip prop="meta.title" label="菜单名称"/>
      <el-table-column align="center" label="图标" width="100">
        <template #default="scope">
          <div style="display: flex;align-items: center;justify-content: center;">
            <svgicon :icon-class="scope.row.meta.icon" class="menuIcon"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序"/>
      <el-table-column align="center" prop="path" label="组件路径"/>
      <el-table-column align="center" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status" class="ml-2" type="success">正常</el-tag>
          <el-tag v-else class="ml-2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      >
      <el-table-column align="center" prop="createTime" label="创建时间"/>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="operate">
            <el-button type="primary" icon="Plus" link size="small" @click="handleAddRouter(scope.row)">新增</el-button>
            <el-button type="primary" icon="EditPen" link size="small" @click="handleUpdateRouter">修改</el-button>
            <el-button type="primary" icon="Delete" link size="small" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--  弹出层-->
  <el-dialog v-model="dialogStatus" :title="title" width="700px">
    <el-form :model="formDialog" :label-width="100">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <el-tree-select v-model="formDialog.parentNode" :data="menuOptions" :render-after-expand="false" placeholder="选择上级菜单" check-strictly highlight-current style="width: 100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型">
            <el-radio-group v-model="formDialog.menuType">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单图标">
            <el-popover v-model:visible="popoverStatus" placement="bottom-start" :width="582" trigger="click" :hide-after="0">
              <template #reference>
                <el-input v-model="formDialog.icon" placeholder="点击选择图标" :prefix-icon="Search" readonly/>
              </template>
              <IconList :selectIcon="formDialog.icon" @selectedIcon="selectedIcon"/>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单标题" required>
            <el-input v-model="formDialog.title" placeholder="请输入菜单标题" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" required>
            <el-input v-model="formDialog.menuName" placeholder="请输入菜单名称" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序">
            <el-input-number v-model="formDialog.sort" :min="1" :max="200" controls-position="right" style="width: 100%"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由地址" required>
            <el-input v-model="formDialog.path" placeholder="请输入路由地址" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formDialog.menuType==0">
          <el-form-item label="路由重定向" required>
            <el-input v-model="formDialog.redirect" placeholder="请输入路由重定向" clearable/>
          </el-form-item>
        </el-col>
        <template v-if="formDialog.menuType==1">
          <el-col :span="12">
            <el-form-item label="组件路径" required>
              <el-input v-model="formDialog.src" placeholder="请输入组建路径" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由参数" required>
              <el-input v-model="formDialog.query" placeholder="请输入路由参数" clearable/>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="12">
          <el-form-item label="显示状态">
            <el-radio-group v-model="formDialog.status">
              <el-radio :label="0">显示</el-radio>
              <el-radio :label="1">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态">
            <el-radio-group v-model="formDialog.hiddent">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  .menuTable {
    width: 100%;

    .menuIcon {
      width: 20px;
      height: 20px;
    }
  }
}

</style>