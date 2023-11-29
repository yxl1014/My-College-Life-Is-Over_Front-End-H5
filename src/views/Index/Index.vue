<script setup>

</script>

<template>
  <div class="container">
    <el-backtop target=".container" :visibility-height="200" :right="50" :bottom="50" />
    <div class="top">
      <div class="title">
        <span>年度最强大的<span class="t1">500K+</span>IP池和T级流量专家</span>
        <span>全平台支持<span class="t2">3000G</span>洪水攻击压测！</span>
        <el-button type="primary" size="large">立即开始</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 200vh;
  background-color: var(--body-content-whiteAndblack);
  .top {
    width: 100%;
    height:calc(100vh - 45px - 98px);
    background:url("@/assets/img/f12.png") no-repeat;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .title{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span{
        padding-bottom: 10px;
        font-size: 40px;
        font-weight: 800;
      }
      button{
        margin-top: 50px;
      }
      .t1{
        color: red;
      }
      .t2{
        color: #135fad;
      }
    }
  }

}
</style>
