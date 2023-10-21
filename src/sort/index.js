// 引入pinia
import { createPinia } from "pinia"
// 引入pinia持久层存储库
import piniaPluginPersist from "pinia-plugin-persist"
//  创建pinia实例
const store = createPinia()
// 将持久层存储应用到pinia实例上
store.use(piniaPluginPersist)

export default store