<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :model="queryForm" inline>
          <el-form-item label="名称">
            <el-input v-model="queryForm.nickName" placeholder="请输入资源名称"/>
          </el-form-item>
          <el-form-item label="IP/域名">
            <el-input v-model="queryForm.ip" placeholder="请输入IP地址或者域名"/>
          </el-form-item>
          <el-form-item label="是否参数">
            <el-select v-model="queryForm.parameter" placeholder="placeholder" style="width: 100px;">
              <el-option label="不限" value=""/>
              <el-option label="是" :value="true"/>
              <el-option label="否" :value="false"/>
            </el-select>
          </el-form-item>
          <el-form-item label="端口">
            <el-input v-model="queryForm.port" placeholder="请输入端口" style="width: 100px"/>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="queryForm.method" placeholder="请选择类型" style="width: 100px;">
              <el-option v-for="item in methodList" :key="item.id" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search">搜索资源</el-button>
            <el-button :icon="Refresh" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="9">
        <el-card class="box-card" shadow="hover" style="margin-left: 10px">
          <div class="cradContent">
            <el-form ref="formRef" :model="form" :rules="formRules" label-width="95px">
              <el-form-item prop="nickName" label="服务器名称">
                <el-input v-model="form.nickName" placeholder="请输入服务器名称" maxlength="10" show-word-limit style="width: 100%"/>
              </el-form-item>
              <el-form-item prop="ip" label="IP/域名">
                <el-input
                    v-model="form.ip"
                    placeholder="请输入IP或域名"
                    class="input-with-select"
                >
                  <template #prepend>
                    <el-select v-model="form.agreement" style="width:90px">
                      <el-option label="Http://" :value="0"/>
                      <el-option label="Https://" :value="1"/>
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="端口">
                <el-input-number v-model="form.port" :min="1" :max="65535" style="width: 100%"/>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="form.method" placeholder="请选择类型" style="width: 100%">
                  <el-option label="Get" :value="1"/>
                  <el-option label="Post" :value="2"/>
                  <el-option label="Delete" :value="3"/>
                  <el-option label="Put" :value="4"/>
                </el-select>
              </el-form-item>
              <el-form-item label="参数是否">
                <el-select v-model="form.parameter" placeholder="请选择是否需要参数" style="width: 100%">
                  <el-option label="是" :value="true"/>
                  <el-option label="否" :value="false"/>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 60%;" @click="saveConfig">保存</el-button>
                <el-button :icon="Refresh" style="width: 30%;" @click="resetConfig">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-table :data="configList" class="configTable">
          <el-table-column label="名称" prop="nickName" align="center" show-overflow-tooltip/>
          <el-table-column label="IP/域名" prop="ip" align="center" show-overflow-tooltip/>
          <el-table-column label="端口" prop="port" align="center" width="80"/>
          <el-table-column label="类型" align="center" width="100">
            <template v-slot="scope">
              {{ filterMethod(scope.row.method) }}
            </template>
          </el-table-column>
          <el-table-column label="参数是否" align="center" width="100">
            <template v-slot="scope">
              {{ filterParameter(scope.row.parameter) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <el-button type="primary" link :icon="EditPen" size="small" @click="handleEditConfig">修改</el-button>
            <el-button type="danger" link :icon="Delete" size="small" @click="handleDeleteConfig">删除</el-button>
          </el-table-column>
        </el-table>
        <pagination
            v-model:pageNum="queryForm.pageNum"
            v-model:pageSize="queryForm.pageSize"
            v-model:total="total"
            @pagination="handlePagination"
        />
      </el-col>
    </el-row>
  </div>
  <!-- 修改配置的弹窗-->
  <el-dialog v-model="configDialogStatus" title="修改服务器配置" @close="resetDialogConfig">
    <div>
      <el-form ref="configDialogFormRef" :model="configDialogForm" :rules="configDialogFormRules"  label-width="95px">
        <el-form-item prop="nickName" label="服务器名称">
          <el-input v-model="configDialogForm.nickName" placeholder="请输入服务器名称" style="width: 100%"/>
        </el-form-item>
        <el-form-item prop="ip" label="IP/域名">
          <el-input
              v-model="configDialogForm.ip"
              placeholder="请输入IP或域名"
              class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="configDialogForm.agreement" style="width:90px">
                <el-option label="Http://" :value="0"/>
                <el-option label="Https://" :value="1"/>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item  label="端口">
          <el-input-number v-model="configDialogForm.port" :min="1" :max="65535" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="configDialogForm.method" placeholder="请选择类型" style="width: 100%">
            <el-option label="Get" :value="1"/>
            <el-option label="Post" :value="2"/>
            <el-option label="Delete" :value="3"/>
            <el-option label="Put" :value="4"/>
          </el-select>
        </el-form-item>
        <el-form-item label="参数是否">
          <el-select v-model="configDialogForm.parameter" placeholder="请选择是否需要参数" style="width: 100%">
            <el-option label="是" :value="true"/>
            <el-option label="否" :value="false"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="configDialogStatus=false">取消</el-button>
        <el-button type="primary" @click="handleUpdateConfig">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {Delete, EditPen, Refresh, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {nanoid} from "nanoid";
import {messageBox} from "@/utils/MessageBox";
import {getConfigDetails} from "@/api/target/target";
import Pagination from "@/components/Pagination/Pagination.vue";
import {successTools} from "@/utils/Tools";

const queryForm = reactive({
  pageNum: 1,
  pageSize: 10,
  nickName: "",
  ip: "",
  port: 1,
  method: "",
  parameter: "",
})
const total=ref(200)
const methodList = reactive([
  {
    id: nanoid(),
    label: "全部",
    value: ""
  },
  {
    id: nanoid(),
    label: "Get",
    value: "0"
  },
  {
    id: nanoid(),
    label: "Post",
    value: "1"
  },
  {
    id: nanoid(),
    label: "Delete",
    value: "2"
  },
  {
    id: nanoid(),
    label: "Put",
    value: "3"
  },
])
const form = reactive({
  nickName: "",
  agreement: 0,
  ip: "",
  port: 1,
  method: 1,
  parameter: false
})
const formRef=ref()
const formRules = reactive({
  nickName: [
    {required: true, message: '请输入名称', trigger: 'blur'},
  ],
  ip:[
    {required: true, message: '请输入IP或域名', trigger: 'blur'},
  ]
})
const configList = reactive([
  {
    id: nanoid(),
    nickName: "超级服务器",
    ip: "http://192.168.0.1",
    port: "8080",
    method: 1,
    parameter: true,
  },
  {
    id: nanoid(),
    nickName: "超级无敌战舰滴滴滴滴滴滴滴滴滴滴滴滴",
    ip: "https://www.alibaba.com",
    port: "65535",
    method: 3,
    parameter: false,
  },
])
const configDialogStatus = ref(false)
const configDialogForm = reactive({
  nickName: "",
  agreement: 0,
  ip: "",
  port: 1,
  method: 1,
  parameter: false
})
const configDialogFormRef=ref()
const configDialogFormRules=reactive({
  nickName: [
    {required: true, message: '请输入名称', trigger: 'blur'},
  ],
  ip:[
    {required: true, message: '请输入IP或域名', trigger: 'blur'},
  ]
})
const handlePagination=()=>{

}
const reset = () => {
  // 重置并发送请求获取初始数据
  Object.assign(queryForm, {
    pageNum: 1,
    pageSize: 10,
    nickName: "",
    ip: "",
    port: 1,
    method: "",
    parameter: "",
  })
//   发送请求获取数据
}
const resetConfig = () => {
  Object.assign(form, {
    nickName: "",
    agreement: 0,
    ip: "",
    port: 1,
    method: 1,
    parameter: false
  })
}
const resetDialogConfig=()=>{
  Object.assign(configDialogForm,{
    nickName: "",
    agreement: 0,
    ip: "",
    port: 1,
    method: 1,
    parameter: false
  })
}
const filterMethod = (method) => {
  return methodList[method].label
}
const filterParameter = (parameter) => {
  return parameter ? "是" : "否"
}
const handleEditConfig = (id) => {
  configDialogStatus.value = true
//   发送请求查询当前id的数据
//   getConfigDetails(id).then(res=>{
//     configDialogStatus.value=true
//   })
}
const handleDeleteConfig = (id) => {
  messageBox("确定删除当前配置").then(() => {

  }).catch(() => {

  })
}
const handleUpdateConfig = () => {
  configDialogFormRef.value.validate(v=>{
    if (v){
      //   发请求修改配置
      configDialogStatus.value = false
    }
  })
}
const saveConfig=()=>{
  formRef.value.validate(v=>{
    if (v){
    //   发送请求保存 弹窗保存成功 重置表单 拉取数据
      successTools("保存成功")
      resetConfig()
    }
  })
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  height: calc(100vh - 168px);

  .cradContent {
    width: 100%;
    height: 420px;
  }

  .configTable {
    width: 100%;
    height: calc(100vh - 270px);
  }
}
</style>