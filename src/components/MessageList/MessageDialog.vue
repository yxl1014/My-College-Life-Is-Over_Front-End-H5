<script setup>
import {reactive, ref} from "vue"
import {ChatDotRound, Refresh} from "@element-plus/icons-vue";
import sysAvatar from "@/assets/img/logo_transparent.png"

const showMessagesStatus = ref(false)
const MessageArr = reactive([
  {
    id: "1",
    title: "Skuya",
    content: "如果喜欢就点个星星支持一下哦",
    historyTime: "2022年12月12日",
    status: 0
  },
  {
    id: "2",
    title: "Lolowan",
    content: "点进去Gitee获取最新开源版本",
    historyTime: "15分钟前",
    status: 0
  },
  {
    id: "3",
    title: "感谢登录SCUI Admin",
    content: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    historyTime: "1小时15分钟前",
    status: 0
  },
  {
    id: "4",
    title: "Skuya",
    content: "如果喜欢就点个星星支持一下哦",
    historyTime: "5分钟前",
    status: 0
  },
  {
    id: "5",
    title: "Lolowan",
    content: "点进去Gitee获取最新开源版本",
    historyTime: "15分钟前",
    status: 0
  },
  {
    id: "6",
    title: "感谢登录SCUI Admin",
    content: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    historyTime: "1小时15分钟前",
    status: 0
  },
  {
    id: "7",
    title: "感谢登录SCUI Admin",
    content: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    historyTime: "1小时15分钟前",
    status: 0
  },
  {
    id: "8",
    title: "感谢登录SCUI Admin",
    content: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    historyTime: "1小时15分钟前",
    status: 0
  },
  {
    id: "9",
    title: "感谢登录SCUI Admin",
    content: "Vue 3.0 + Vue-Router 4.0 + ElementPlus + Axios 后台管理系统。",
    historyTime: "1小时15分钟前",
    status: 0
  },
])
const timers = reactive({})
const successUpdateMsgStatusList=reactive([])
const showMessages = () => {
  showMessagesStatus.value = true
}
/**
 * 一键已读
 */
const readAllMessages = () => {

}
/**
 * 刷新列表获取最新消息
 */
const refresh = () => {

}
/**
 * 当鼠标悬停大于1s的时候视为该消息已读
 * @param item 每一条消息
 */
const startTimer = (item) => {
  const {id} = item;
  // 如果消息还未被标记为已读，并且计时器不存在
  if (MessageArr.find(message => message.id === id && message.status == 0) && !timers[id]) {
    console.log(11)
    timers[id] = setTimeout(() => {
      // 将消息标记为已读
      const index = MessageArr.findIndex(message => message.id === id);
      if (index !== -1) {
        MessageArr[index] = {
          ...MessageArr[index],
          status: 1
        }
        successUpdateMsgStatusList.push(id)
      }
      // 清除计时器
      clearTimeout(timers[id]);
      // 清除 计时器列表中的 当前计时器
      delete timers[id];
      console.log("已更改状态")
    }, 1000)
  }
}
/**
 * 当鼠标移除时 去掉计时器
 * @param item 当前消息
 */
const endTimer=(item)=>{
  if (timers[item.id]){
    // 清除计时器
    clearTimeout(timers[item.id]);
    // 清除 计时器列表中的 当前计时器
    delete timers[item.id];
    console.log("悬停时间不足2s已取消")
  }
}
/**
 * 当抽屉隐藏之后发送信息更新消息状态（已读/未读）
 */
const handleUpdateMsgStatus=()=>{
  if (successUpdateMsgStatusList.length>0){
    // 发送请求更新状态
    console.log("发送请求更新状态")
    successUpdateMsgStatusList.length=0
  }
}
</script>

<template>
  <!--  消息 抽屉-->
  <el-button circle @click="showMessages" style="margin-right: 10px">
    <el-badge :value="10" :max="99" class="item">
      <el-icon>
        <ChatDotRound/>
      </el-icon>
    </el-badge>
  </el-button>
  <el-drawer v-model="showMessagesStatus" :with-header="false" @close="handleUpdateMsgStatus">
    <div class="taskDrawer">
      <div class="taskTitle">
        <span>消息中心</span>
      </div>
      <el-scrollbar class="taskScrollbar" v-if="MessageArr.length>0">
        <!--        每一个消息-->
        <div class="taskCard" v-for="(item,index) in MessageArr" :key="item.id" @mouseover="startTimer(item)" @mouseleave="endTimer(item)">
          <div class="taskItemCard">
            <div class="cardIcon">
              <el-badge is-dot :hidden="item.status===1" class="item">
                <el-avatar :size="50" :src="sysAvatar" class="avatar"/>
              </el-badge>
            </div>
            <div class="cardDesc">
              <div class="title">
                <span class="titleContext">{{ item.title }}</span>
                <span class="time">{{ item.content }}</span>
              </div>
              <div class="historyTime">
                {{ item.historyTime }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <el-empty description="暂无消息" v-else style="height: calc(100vh - 79px - 50px)"/>
      <el-divider style="margin: 0px"/>
      <div class="footer">
        <el-button size="large" @click="readAllMessages">全部设为已读</el-button>
        <el-button :icon="Refresh" circle size="large" @click="refresh"/>
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

    .taskCard {
      padding: 20px 15px;
      border-top: 1px solid var(--header-message-border-color);

      .taskItemCard {
        width: 100%;
        display: flex;
        align-items: center;

        .cardIcon {
          margin-right: 10px;

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            //background:var(--header-task-icon-background-color);
            display: flex;
            align-items: center;
            justify-content: center;

            .iconSvg {
              color: var(--theme-color);;
            }
          }
        }

        .cardDesc {
          display: flex;
          flex: auto;
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

          .historyTime {
            font-size: 12px;
            color: #999;
            width: 120px;
            text-align: right;
          }
        }
      }

      &:hover {
        cursor: pointer;
        background: var(--header-message-background-color);
      }
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    padding: 10px 15px;
    align-items: center;
    justify-content: space-between;
  }
}
</style>