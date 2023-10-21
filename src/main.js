import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 引入elementUI-plus
import ElementPlus from "element-plus";
// 引入全局ElementPlus样式
import "element-plus/dist/index.css";

// 引入自定义创建的sort
import store from "@/sort/index.js";

// 引入router
import router from "@/router/index.js";

// 引入elementUI 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 应用引入elementUI 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 应用ElementPlus
app.use(ElementPlus);
// 应用sort
app.use(store);
// 应用router
app.use(router);

app.mount("#app");
