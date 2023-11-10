import axios from "axios";
import cache from "@/plugins/cache";
import {getToken} from "@/utils/auth";
import {useRouter} from "vue-router";
import {errorTools} from "@/utils/Tools";
import errorCode from "@/utils/errorCode";
// 引入env配置文件
const env = import.meta.env
// 是否显示重新登录
export let isRelogin = {show: false};

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: env.VITE_BASE_API,
    // 超时
    timeout: 10000,
});
console.log("当前环境", env.VITE_BASE_API);
// request拦截器
service.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false;
        if (getToken() && !isToken) {
            config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // get请求映射params参数
        if (config.method === "get" && config.params) {
            let url = config.url + "?" + tansParams(config.params);
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;
        }
        if (config.method === "post" || config.method === "put") {
            const requestObj = {
                url: config.url,
                data:
                    typeof config.data === "object"
                        ? JSON.stringify(config.data)
                        : config.data,
                time: new Date().getTime(),
            };
            const sessionObj = cache.session.getJSON("sessionObj");
            if (
                sessionObj === undefined ||
                sessionObj === null ||
                sessionObj === ""
            ) {
                cache.session.setJSON("sessionObj", requestObj);
            } else {
                const s_url = sessionObj.url; // 请求地址
                const s_data = sessionObj.data; // 请求数据
                const s_time = sessionObj.time; // 请求时间
                const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
                if (
                    s_data === requestObj.data &&
                    requestObj.time - s_time < interval &&
                    s_url === requestObj.url
                ) {
                    const message = "数据正在处理，请勿重复提交";
                    console.warn(`[${s_url}]: ` + message);
                    return Promise.reject(new Error(message));
                } else {
                    cache.session.setJSON("sessionObj", requestObj);
                }
            }
        }
        return config;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use((res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (
        res.request.responseType === "blob" ||
        res.request.responseType === "arraybuffer"
    ) {
        return res.data;
    }
    if (code === 401) {
        if (!isRelogin.show) {
            isRelogin.show = true;
            const router = useRouter()
            router.replace("/401")
        }
        return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
        errorTools(msg)
        return Promise.reject(new Error(msg))
    } else {
        return res.data
    }
});

export default service