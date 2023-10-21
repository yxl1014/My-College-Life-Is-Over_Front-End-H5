import { defineStore } from "pinia"
import {reactive,ref} from "vue"
export const userStore = defineStore({
    id: "info", // id是唯一的，如果有多个文件，ID不能重复
    state: () => {
        return {
            userinfo:reactive({}),
            bank_type: 1, 
            token:ref(""),
        } 
    },
    actions: {
        setInfo(data) {
            console.log("data",data);
            this.userinfo = data
        },
        setBankType(data) {
            this.bank_type = data
        },
        setToken(data){
            this.token=data
        },
        // 用户退出，清除本地数据
        logout() {
            this.userinfo = null
            sessionStorage.clear()
            localStorage.clear()
        },
    },
    // 开启数据缓存，在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
    // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化，如：paths: ['userinfo'] 替换key的位置
    persist: {
        enabled: true,
        strategies: [
            {   
                key: "token",
                paths:["token"], //存储部分变量
                storage: localStorage,
            },
        ],
    },
})