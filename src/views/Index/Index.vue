<script setup>
import step1 from "@/assets/img/step1.png"
import step2 from "@/assets/img/step2.png"
import step3 from "@/assets/img/step3.png"
import step_drak1 from "@/assets/img/step_dark1.png"
import step_drak2 from "@/assets/img/step_dark2.png"
import step_drak3 from "@/assets/img/step_dark3.png"
import {onMounted, ref, onBeforeUnmount, computed} from "vue"
import {themeModeStore} from "@/sort/sort_example/themeMode";
import logo from "@/assets/img/logo_transparent.png"
import router from "@/router";
import {Star} from "@element-plus/icons-vue";
import dayjs from 'dayjs'

const currentTime=ref(dayjs().format('HH:mm:ss'))
onMounted(() => {
  setInterval(()=>{
    currentTime.value=dayjs().format('HH:mm:ss')
  }, 1000);
  // 添加监听事件  只要浏览器高度发生变化就重新计算content的高度
  // window.addEventListener('resize', calculateHeight)
  // console.log("sort.mode-->", sort.mode)
})
onBeforeUnmount(() => {
  // 销毁之前去除监听事件
  // window.removeEventListener('resize', calculateHeight)
})
//回到顶部的对象
const scrollContainer = ref(null)
// 内容区高度
const size = ref(window.innerHeight - 45 - 98);

const sort = themeModeStore()

// 初始化内容区高度
function calculateHeight() {
  size.value = window.innerHeight - 45 - 98;
}

// 是否显示回到顶部按钮
const showGoTop = ref(false)

//滚动时候触发的函数 当滚动距离大于100时候才会出现回到顶部
function handleScrool(e) {
  if (e.scrollTop > 100) {
    showGoTop.value = true
  } else {
    showGoTop.value = false
  }
}


function goTop() {
  scrollContainer.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// 立即开始
const onStart = () => {
  router.push("/configureResources/target")
}

</script>

<template>
  <div class="container">
    <div class="goTop" v-if="showGoTop" @click="goTop">
      <el-icon>
        <Top/>
      </el-icon>
    </div>
    <el-row :gutter="24" class="exhibition">
      <el-col :span="12">
        <el-card shadow="hover">
          <h1>欢迎</h1>
          <div class="wcCard">
            <el-image :src="logo" style="width: 180px;min-height: 180px"/>
            <h1>欢迎体验 LoadRunnerX</h1>
            <div>
              <div class="wcdesc">
                <div class="descIcon">
                  <el-icon>
                    <Menu/>
                  </el-icon>
                </div>
                <span>LoadRunnerX 是一款基于Selenium的自动化测试工具，它可以帮助你轻松地进行Web自动化测试。</span>
              </div>
              <div class="wcdesc">
                <div class="descIcon">
                  <el-icon>
                    <Promotion/>
                  </el-icon>
                </div>
                <span>在提高前端算力、减少带宽请求和代码执行力上多次优化，并且持续着。</span>
              </div>
              <div class="wcdesc">
                <div class="descIcon">
                  <el-icon>
                    <UploadFilled/>
                  </el-icon>
                </div>
                <span>LoadRunnerX 强大的系统性能和稳定性是高水平、高竞争力的软件的关键。通过进行性能压力测试，开发人员可以发现和解决性能问题，并确定系统的最大负载容量。。</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="aboutCard">
            <h1>关于产品</h1>
            <div class="about">
              <p style="font-size: 12px;margin: 10px 0px">
                高性能 / 精致 / 优雅。基于Vue3 + Element-Plus 的中后台前端解决方案，如果喜欢就点个星星支持一下。
              </p>
            </div>
            <el-button type="primary" :icon="Star" style="width: 30%">13.6K</el-button>
          </div>
        </el-card>
        <div style="padding: 10px 0px"></div>
        <el-card shadow="hover">
          <div class="versionCard">
            <h1>版本信息</h1>
            <div class="version">
              <el-image src="https://lolicode.gitee.io/scui-doc/demo/img/ver.svg"/>
              <span>LoadRunnerX 1.6.8</span>
              <span>最新版本 1.7.4</span>
            </div>
          </div>
          <el-button type="primary" round>更新日志</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card shadow="hover" style="background: linear-gradient(90deg,#8e54e9,#4776e6);">
            <div class="timeCard">
              <h1>时钟</h1>
              <p class="time">{{currentTime}}</p>
              <p class="date">{{ dayjs().format('YYYY年MM月DD日') }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="top">
      <div class="title">
        <span>年度最强大的<span class="t1">500K+</span>IP池和T级流量专家</span>
        <span>全平台支持<span class="t2">3000G</span>洪水攻击压测！</span>
        <el-button type="primary" size="large" @click="onStart">立即开始</el-button>
      </div>
    </div>
    <div class="illustration">
      <svg viewBox="15 12 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z" fill="#1B1B2AFF"></path>
      </svg>
    </div>
    <div class="middle">
      <div class="title">
        <span class="heading">怎么运行的</span>
        <span class="subtitle">注册付费后您可以看到基本功能</span>
        <span class="subtitle">通过购买访问权限来解锁高级功能</span>
      </div>
      <div class="step">
        <div class="stepItem">
          <div class="picture">
            <el-image v-if="sort.mode" style="width: 125px; height: 125px" :src="step_drak1" fit="fill"/>
            <el-image v-else style="width: 125px; height: 125px" :src="step1" fit="fill"/>
          </div>
          <div class="stepTitle">
            <div class="number">
              1
            </div>
            <div class="content">
              验证并注册
            </div>
          </div>
          <div class="desc">
            <span>只需15秒即可注册</span>
            <span>登录即可访问。</span>
          </div>
        </div>
        <div class="stepItem">
          <div class="picture">
            <el-image v-if="sort.mode" style="width: 125px; height: 125px" :src="step_drak2" fit="fill"/>
            <el-image v-else style="width: 125px; height: 125px" :src="step2" fit="fill"/>

          </div>
          <div class="stepTitle">
            <div class="number">
              2
            </div>
            <div class="content">
              付费计划
            </div>
          </div>
          <div class="desc">
            <span>使用货币存款</span>
            <span>打开商店页面并选择计划</span>
          </div>
        </div>
        <div class="stepItem">
          <div class="picture">
            <el-image v-if="sort.mode" style="width: 125px; height: 125px" :src="step_drak3" fit="fill"/>
            <el-image v-else style="width: 125px; height: 125px" :src="step3" fit="fill"/>
          </div>
          <div class="stepTitle">
            <div class="number">
              3
            </div>
            <div class="content">
              享受压力测试的魅力
            </div>
          </div>
          <div class="desc">
            <span>现在您可以单击面板</span>
            <span>并享受所有功能</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: var(--body-content-whiteAndblack);
  box-sizing: border-box;
  overflow: hidden;

  .exhibition {
    padding: 0 10px 10px;

    .wcCard {
      height: 60vh;
      padding: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .wcdesc {
        display: flex;
        align-items: center;
        margin: 15px 0px;

        .descIcon {
          min-width: 50px;
          min-height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          font-size: 18px;
          background: var(--indexView-icon-background-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--el-color-primary);
        }
      }

    }
    .aboutCard{
      height:15vh;
      margin: 10px 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .versionCard {
      height: 30vh;
      margin: 10px 0px;
      .version {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    .timeCard{
      color: white;
      .time{
        font-size:40px;
        font-weight: bold;
        margin-top: 10px;
      }
      .date{
        font-size:13px;
        opacity: 0.7;
        margin-top: 10px;
      }
    }
  }

  .goTop {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 50px;
    right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    background: var(--el-color-primary-light-3);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background: var(--el-color-primary);
    }
  }

  .top {
    width: 100%;
    height: calc(100vh - 45px - 160px);
    background: url("@/assets/img/f12.png") no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        padding-bottom: 10px;
        font-size: 40px;
        font-weight: 800;
      }

      button {
        margin-top: 50px;
      }

      .t1 {
        color: red;
      }

      .t2 {
        color: #135fad;
      }
    }
  }

  .illustration {
    width: 100%;
    height: 100px;
    background: var(--body-content-illustration-background);

    svg {
      path {
        fill: var(--body-content-illustration-svgBackground)
      }
    }
  }

  .middle {
    width: 100%;
    height: 100vh;
    background: var(--body-content-illustration-background);

    .title {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--body-content-middle-subtitle-color);

      .heading {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      .subtitle {
        font-size: 18px;
        color: var(--body-content-middle-subtitle-color);
        font-weight: 600;
        margin-top: 5px;
      }
    }

    .step {
      width: 100%;
      margin-top: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      .stepItem {
        width: 420px;
        height: 500px;

        .picture {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stepTitle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0px;

          .number {
            width: 40px;
            height: 40px;
            background: #1c3238;
            color: #50cd89;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            font-size: 24px;
            margin-right: 20px;
            font-weight: 600;
          }

          .content {
            font-size: 22px;
            font-weight: 600;
            color: var(--body-content-middle-subtitle-color);
          }
        }
      }
    }

    .desc {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #565674;
      font-size: 20px;
      line-height: 30px;
    }
  }

}
</style>
