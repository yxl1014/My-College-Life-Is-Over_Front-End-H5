import { defineStore } from "pinia"
import {reactive,ref} from "vue"
export const themeModeStore = defineStore({
    id: "mode", // id是唯一的，如果有多个文件，ID不能重复
    state: () => {
        return {
            mode:ref(true) // true代表亮色模式 代表暗色模式false
        }
    },
    actions: {
        updateThemeMode(data) {
            console.log("data-->",data)
            this.mode = data
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "mode",
                storage: localStorage,
            },
        ],
    },
})