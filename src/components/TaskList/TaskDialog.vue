<script setup>
import {Refresh, Sort} from "@element-plus/icons-vue";
import {reactive, ref,toRef} from "vue";
const showTasksStatus = ref(false)
const tasksArr = reactive([
  {
    id: "1",
    title: "年度报表生成",
    createTime: "2022-06-13",
    status: "0"
  },
  {
    id: "2",
    title: "年度报表生成",
    createTime: "2022-06-13",
    status: "-1"
  },
  {
    id: "3",
    title: "系统日志导出",
    createTime: "2022-06-13",
    status: "1"
  },
  {
    id: "4",
    title: "年度报表生成",
    createTime: "2022-06-13",
    status: "0"
  },
  {
    id: "5",
    title: "年度报表生成",
    createTime: "2022-06-13",
    status: "-1"
  },
  {
    id: "6",
    title: "系统日志导出",
    createTime: "2022-06-13",
    status: "1"
  },
])
/**
 * 刷新任务列表
 */
const showTasks = () => {
  showTasksStatus.value = true
//   发送请求
}
</script>

<template>
  <el-button :icon="Sort" circle @click="showTasks" style="margin-right: 10px"/>
  <!--  抽屉 弹出任务队列-->
  <el-drawer v-model="showTasksStatus" :with-header="false">
    <div class="taskDrawer" >
      <div class="taskTitle">
        <span>任务中心</span>
      </div>
      <el-scrollbar class="taskScrollbar" v-if="tasksArr.length>0">
        <div>
          <el-card shadow="hover" class="taskCard" v-for="(item,index) in tasksArr" :key="item.id">
            <div class="taskItemCard">
              <div class="cardIcon">
                <div class="icon">
                  <el-icon>
                    <Aim class="iconSvg"/>
                  </el-icon>
                </div>
              </div>
              <div class="cardDesc">
                <div class="title">
                  <span class="titleContext">{{ item.title }}</span>
                  <span class="time">{{ item.createTime }} 创建</span>
                </div>
                <div class="status">
                  <el-tag v-if="item.status==-1" class="ml-2" type="info">等待中</el-tag>
                  <el-tag v-else-if="item.status==0" class="ml-2">执行中</el-tag>
                  <el-tag v-else-if="item.status==1" class="ml-2" type="success">已完成</el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-scrollbar>
      <el-empty description="暂无任务"  v-else style="height: calc(100vh - 79px - 50px)"/>
      <el-divider style="margin: 0px"/>
      <div class="footer">
        <el-button :icon="Refresh" circle size="large" @click="showTasks"/>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.taskDrawer {
  width: 100%;
  display: flex;
  flex-direction: column;

  .taskTitle {
    font-size: 17px;
    font-weight: 700;
    padding: 15px;
    color: #72767B;
    margin-bottom: 25px;
  }

  .taskScrollbar {
    height: calc(100vh - 79px - 50px);
    padding: 0px 15px;

    .taskCard {
      margin: 10px 0px;

      .taskItemCard {
        width: 100%;
        display: flex;

        .cardIcon {
          margin-right: 10px;

          .icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background:var(--header-task-icon-background-color);
            display: flex;
            align-items: center;
            justify-content: center;
            .iconSvg{
              color: var(--theme-color);;
            }
          }
        }

        .cardDesc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            display: flex;
            flex-direction: column;

            .titleContext {
              font-size: 15px;
              color: var(--header-task-title-color);
            }

            .time {
              font-size: 12px;
              color: #999;
              margin-top: 5px;
            }
          }

          .status {
            margin-top: 15px;
          }
        }
      }

      &:hover {
        cursor: pointer;
        border-color: var(--theme-color);
      }
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    padding: 10px 15px;
    align-items: center;
    justify-content: right;
  }
}
</style>