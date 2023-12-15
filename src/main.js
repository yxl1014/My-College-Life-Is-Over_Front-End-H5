import { createApp } from "vue";
import App from "./App.vue";
// elementUI官方暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式样式 覆盖官方样式
import "@/assets/style/my-theme-chalk.scss"
const app = createApp(App);

// 引入elementUI-plus
import ElementPlus from "element-plus";
// 引入全局ElementPlus样式
import "element-plus/dist/index.css";

// 引入自定义创建的sort
import store from "@/sort/index.js";

// 引入router
import router from "@/router/index.js";

// 引入svg-icons注册依赖
import 'virtual:svg-icons-register'
import initSvgIcon from "@/components/SvgIcon/index"

// 引入elementUI 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import NProgress from "nprogress";
// 应用引入elementUI 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

//全局进度条的配置
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 1000,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 应用ElementPlus
app.use(ElementPlus);
// 应用sort
app.use(store);
// 应用router
app.use(router);
// 应用自定义svgIcon
app.use(initSvgIcon);
app.mount("#app");
