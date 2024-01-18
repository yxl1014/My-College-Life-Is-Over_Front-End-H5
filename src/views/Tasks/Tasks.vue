<script setup>
import {reactive, ref, onMounted, onUpdated, nextTick, watch} from 'vue'
import {Coin, Refresh, Search} from "@element-plus/icons-vue";
import {nanoid} from "nanoid";
import Prism from "prismjs";
import {messageBox} from "@/utils/MessageBox";
import Pagination from "@/components/Pagination/Pagination.vue";

onUpdated(() => {
  Prism.highlightAll(); //修改内容后重新渲染
});
onMounted(() => {
  Prism.highlightAll(); //切换菜单重新渲染
})
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10,
  ip: "",
  status: "",
  data: "",
  type: "",
  startTime: "",
  endTime: "",
  startMoney: "",
  endMoney: "",
})
const total = ref(200)
const reset = () => {
  // 重置并发送请求获取初始数据
  Object.assign(queryForm, {
    pageNum: 1,
    pageSize: 10,
    ip: "",
    status: "",
    data: "",
    type: "",
    startTime: "",
    endTime: "",
    startMoney: "",
    endMoney: "",
  })
//   发送请求获取数据

}
const timeRange = ref([])
const taskList = reactive([
  {
    id: nanoid(),
    type: 0,
    status: 0,
    startTime: "2022-01-01 12:00:00",
    endTime: "2022-01-31 12:00:00",
    money: 1000,
    ip: "https://www.baidu.com",
    currentPersonNum: 3,
    personNum: 4,
    port: "8080",
    method: 'Get',
    parameter: null,
    createTime: "2022-01-01 12:00:00",
    updateTime: "2022-01-01 12:00:00"
  },
  {
    id: nanoid(),
    type: 0,
    status: 1,
    startTime: "2022-05-01 12:00:00",
    endTime: "2022-06-31 12:00:00",
    money: 899,
    ip: "https://www.womenhenlihai.com",
    currentPersonNum: 2,
    personNum: 2,
    port: "8080",
    method: 'Post',
    parameter: {
      id: nanoid(),
      data: {
        userName: "张三",
        sex: 0
      }
    },
    createTime: "2022-01-01 12:00:00",
    updateTime: "2022-01-01 12:00:00"
  },
  {
    id: nanoid(),
    type: 0,
    status: 2,
    startTime: "2022-05-22 12:00:00",
    endTime: "2022-05-22 13:00:00",
    money: 450,
    ip: "https://www.womenhenlihai.com",
    currentPersonNum: 2,
    personNum: 3,
    port: "8080",
    method: 'Put',
    parameter: {
      id: nanoid(),
      data: {
        userName: "李四",
        sex: 80
      }
    },
    createTime: "2022-01-01 12:00:00",
    updateTime: "2022-01-01 12:00:00"
  },
])
const taskTypeList = reactive([
  {
    id: nanoid(),
    label: "定时攻击",
    value: 0
  }
])
const taskStatusList = reactive([
  {
    id: nanoid(),
    label: "等待中",
    value: 0
  },
  {
    id: nanoid(),
    label: "测试中",
    value: 1
  },
  {
    id: nanoid(),
    label: "已完成",
    value: 2
  }
])
const taskDialogStatus = ref(false)
const sendTaskForm = reactive({
  server: "",
  type: 0,
  personNum: 1,
  parameter:"",
  startTime: "",
  endTime: "",
  money: "",
})
const attackTime = ref([])
const selectedSeverId = ref("")
const severList = reactive([
  {
    id: nanoid(),
    name: "服务器1",
    ip:"http://www.baidu.com"
  },
  {
    id: nanoid(),
    name: "服务器12",
    ip:"http://www.baidu.com"
  },
  {
    id: nanoid(),
    name: "服务器456",
    ip:"http://www.baidu.com"
  }
])
const sendTaskFormRef=ref()
const sendTaskRules=reactive({
  server:[
    {required:true,message:"请选择服务器",trigger:"change"}
  ],
  type:[
    {required:true,message:"请选择攻击类型",trigger:"change"}
  ],
  parameter:[
    {required:true,message:"请选输入参数",trigger:"change"}
  ],
  startTime:[
    {required:true,message:"请选择攻击时间",trigger:"change"}
  ],
  money:[
    {required:true,message:"请输入金额",trigger:"blur"},
    {pattern: /^[0-9.]*$/, message: '金额为数字', trigger: 'blur'}
  ],
})
/**
 * 过滤当前任务类型
 * @param index
 * @returns {*}
 */
const filterTaskType = (index) => {
  return taskTypeList[index].label
}
/**
 * 过滤当前任务的状态
 * @param index
 * @returns {*}
 */
const filterTaskStatus = (index) => {
  return taskStatusList[index].label
}
/**
 *  过滤参数状态
 * @param parameter
 * @returns {string}
 */
const filterParameterStatus = (parameter) => {
  return parameter ? "是" : "否"
}
/**
 * 当表格的隐藏数据打开时 渲染代码块
 */
const handleExpandChange = () => {
  nextTick(() => {
    Prism.highlightAll();
  });
}
/**
 * 接单
 * @param row
 */
const acceptTask = (row) => {
  messageBox("是否要接受此单 未按时完成将进行处罚").then(() => {
    console.log("接受")
  }).catch(() => {
    console.log("不接受")
  })
}
const handlePagination = () => {
  console.log("分页", queryForm.pageSize, queryForm.pageNum)
}
const sendTask=()=>{
  sendTaskFormRef.value.validate(v=>{
    if (v){
    //   通过校验发送请求
      taskDialogStatus.value=false
    }
  })
}
const resetSendTaskForm=()=>{
  Object.assign(sendTaskForm,{
    server: "",
    type: 0,
    personNum: 1,
    startTime: "",
    endTime: "",
    money: "",
  })
  selectedSeverId.value=""
  attackTime.value=[]
}
/**
 * 监听选中服务器 变化
 */
watch(() => selectedSeverId.value, () => {
  if (selectedSeverId.value !== "") {
    console.log("获取最新服务器信息")
    sendTaskForm.server={
      parameter:true
    }
  }
})
watch(()=>attackTime.value,()=>{
  sendTaskForm.startTime=attackTime.value[0]
  sendTaskForm.endTime=attackTime.value[1]

})
</script>

<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form :model="queryForm" inline>
          <el-form-item label="IP/域名">
            <el-input v-model="queryForm.ip" placeholder="请输入IP地址或者域名"/>
          </el-form-item>
          <el-form-item label="任务状态">
            <el-select v-model="queryForm.status" placeholder="placeholder" style="width: 150px;">
              <el-option label="全部" value=""></el-option>
              <el-option
                  v-for="item in taskStatusList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否参数">
            <el-select v-model="queryForm.data" placeholder="placeholder" style="width: 100px;">
              <el-option label="不限" value=""/>
              <el-option label="是" :value="true"/>
              <el-option label="否" :value="false"/>
            </el-select>
          </el-form-item>
          <el-form-item label="攻击类型">
            <el-select v-model="queryForm.type" placeholder="placeholder" style="width: 100px;">
              <el-option label="全部" value=""></el-option>
              <el-option
                  v-for="item in taskTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD HH:mm:ss"
                date-format="YYYY/MM/DD ddd"
                clearable
            />
          </el-form-item>
          <el-form-item label="报酬">
            <el-input v-model="queryForm.startMoney" placeholder="最低" style="width: 80px;"/>
            <span style="margin: 0px 10px">至</span>
            <el-input v-model="queryForm.startMoney" placeholder="最高" style="width: 80px;"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search">搜索任务</el-button>
            <el-button :icon="Refresh" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="2">
        <el-button type="primary" style="margin-bottom: 10px" @click="taskDialogStatus=true">发布任务</el-button>
      </el-col>
    </el-row>
    <el-table :data="taskList" style="width: 100%;height: calc(100vh - 370px)" highlight-current-row @expand-change="handleExpandChange">
      <el-table-column type="expand" prop="parameter">
        <template #default="scope">
          <div class="tableExpandContent">
            <pre v-if="scope.row.parameter">
      <code class="language-javascript line-numbers">
{{ scope.row.parameter }}
      </code>
    </pre>
            <span v-else>无需参数</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP/域名" min-width="170" align="center" show-overflow-tooltip/>
      <el-table-column prop="port" label="端口" width="80" align="center"/>
      <el-table-column prop="method" label="类型" width="80" align="center"/>
      <el-table-column label="参数" width="80" align="center">
        <template v-slot="scope">
          {{ filterParameterStatus(scope.row.parameter) }}
        </template>
      </el-table-column>
      <el-table-column label="攻击类型" min-width="120" align="center">
        <template v-slot="scope">
          {{ filterTaskType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="任务状态" min-width="100" align="center">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status===0">{{ filterTaskStatus(scope.row.status) }}</el-tag>
          <el-tag type="warning" v-if="scope.row.status===1">{{ filterTaskStatus(scope.row.status) }}</el-tag>
          <el-tag type="danger" v-if="scope.row.status===2">{{ filterTaskStatus(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="人数" min-width="80" align="center">
        <template v-slot="scope">
          {{ scope.row.currentPersonNum }} / {{ scope.row.personNum }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" min-width="160" align="center"/>
      <el-table-column prop="endTime" label="结束时间" min-width="160" align="center"/>
      <el-table-column label="报酬" min-width="120" align="center">
        <template v-slot="scope">
          {{ scope.row.money }}元
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template v-slot="scope">
          <el-button type="primary" text :icon="Coin" @click="acceptTask(scope.row)" :disabled="scope.row.status!=0">接单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
        v-model:pageNum="queryForm.pageNum"
        v-model:pageSize="queryForm.pageSize"
        v-model:total="total"
        @pagination="handlePagination"
    />
  </div>
<!--  发布任务弹窗-->
  <el-dialog v-model="taskDialogStatus" title="发布任务" @close="resetSendTaskForm">
    <div>
      <el-form ref="sendTaskFormRef" :model="sendTaskForm" :rules="sendTaskRules" label-width="100px">
        <el-form-item label="目标服务器" prop="server">
          <el-select v-model="selectedSeverId" filterable placeholder="请选择目标服务器" style="width: 100%;">
            <el-option
                v-for="item in severList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right">{{ item.ip }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="攻击类型" prop="type">
          <el-select v-model="sendTaskForm.type" filterable placeholder="请选择攻击类型" style="width: 100%;">
            <el-option
                v-for="item in taskTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数" prop="parameter" v-if="sendTaskForm.server.parameter">
          <el-input
              v-model="sendTaskForm.parameter"
              autosize
              type="textarea"
              placeholder="请输入参数"
              maxlength="1000"
              show-word-limit
          />
        </el-form-item>
        <el-form-item label="人数">
          <el-input-number v-model="sendTaskForm.personNum" :min="1" :max="99"/>
        </el-form-item>
        <el-form-item label="攻击时间" prop="startTime">
          <el-date-picker
              :teleported="false"
              v-model="attackTime"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              clearable
          />
        </el-form-item>
        <el-form-item label="报酬" prop="money">
          <el-input v-model="sendTaskForm.money" placeholder="请输入报酬" style="width:100px"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="taskDialogStatus = false">取消</el-button>
        <el-button type="primary" @click="sendTask">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  padding: 0 10px 10px 10px;
  box-sizing: border-box;

  .tableExpandContent {
    width: 100%;
    padding: 0 20px;
  }

}
</style>