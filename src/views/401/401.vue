<template>
  <div class="errPage-container">
    <el-button :icon="ArrowLeft" class="pan-back-btn" @click="back">
      重新登录
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">401错误!</h1>
        <h2>您没有访问权限！</h2>
        <h6>
          对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面重新登录
        </h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/"> 回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
            :src="errGifSrc"
            width="313"
            height="428"
            alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import errGif from "@/assets/img/401.gif";
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {ArrowLeft} from "@element-plus/icons-vue";
import {removeToken} from "@/utils/auth";

const router = useRouter();
const errGifSrc = ref(errGif + "?" + +new Date());

function back() {
  removeToken()
  router.replace("/member/login");
}
</script>
<style lang="scss" scope>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
