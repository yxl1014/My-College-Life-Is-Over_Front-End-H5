<script setup>
  import step1 from "@/assets/img/step1.png"
  import step2 from "@/assets/img/step2.png"
  import step3 from "@/assets/img/step3.png"

</script>

<template>
  <div class="container">
    <el-backtop :v-if="true" target=".el-scrollbar__wrap" :visibility-height="200" :right="50" :bottom="50" />
    <div class="top">
      <div class="title">
        <span>年度最强大的<span class="t1">500K+</span>IP池和T级流量专家</span>
        <span>全平台支持<span class="t2">3000G</span>洪水攻击压测！</span>
        <el-button type="primary" size="large">立即开始</el-button>
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
            <el-image style="width: 125px; height: 125px" :src="step1" fit="fill" />
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
            <el-image style="width: 125px; height: 125px" :src="step2" fit="fill" />
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
            <el-image style="width: 125px; height: 125px" :src="step3" fit="fill"/>
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
  //height: 200vh;
  background-color: var(--body-content-whiteAndblack);

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
    background: #151521;
  }

  .middle {
    width: 100%;
    height: 100vh;
    background: #151521;
    .title{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .heading{
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .subtitle{
        font-size: 18px;
        color: #cdcdde;
        font-weight: 600;
        margin-top: 5px;
      }
    }
    .step{
      width: 100%;
      margin-top: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .stepItem{
        width: 420px;
        height: 500px;
        .picture{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stepTitle{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0px;
          .number{
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
          .content{
            font-size: 22px;
            font-weight: 600;
            color: #cdcdde;
          }
        }
      }
    }
    .desc{
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
