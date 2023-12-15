import {fileURLToPath, URL} from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path';
export default ({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        // 配置代理转发
        server: {
            open: true, //编译完成之后是否打开网页
            host: "0.0.0.0", //指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
            hot: true, //开启热加载
            port: 8081, //访问的端口号
            proxy: {
                [env.VITE_BASE_API]: {
                    target: "http://120.26.67.97:18080",
                    // target: "http://127.0.0.1:3000",
                    changeOrigin: true, //是否允许跨域
                    rewrite: (path) => path.replace(env.VITE_BASE_API, ""),
                    // 正则匹配 替换路径为 ''
                },
            },
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            // 注册所有的svg文件生成svg雪碧图
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/assets/img/svg")], // icon存放的目录
                symbolId: "icon-[name]", // symbol的id
                inject: "body-last", // 插入的位置
                customDomId: "__svg__icons__dom__" // svg的id
            })
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        // 自定义添加的 把scss中的@指向src目录
        css: {
            // css预处理器
            preprocessorOptions: {
                scss: {
                    // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
                    // 给导入的路径最后加上 ;
                    additionalData: '@import "@/assets/style/mixin.scss";',
                },
            },
        },
    });
};
