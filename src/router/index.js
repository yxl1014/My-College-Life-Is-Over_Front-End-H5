import {createRouter, createWebHistory} from "vue-router";
import {getToken} from "@/utils/auth";
// ()=>component: import(""),     路由懒加载
// redirect                       路由重定向
// beforeEnter(to,from,next)      独享路由守卫 to 从哪来 from 到哪去 next 放行
// hiddent                        是否在sindbar中隐藏此路由菜单
import Layout from "@/Layout/index.vue"
import Member from "@/Layout/Member/Member.vue"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as path from "path";

const routes = [
    {
        path: "/",
        redirect: "/index",
        hiddent: true,
    },
    {
        path: "/member",
        component: Member,
        hiddent: true,
        redirect: "/member/login",
        children: [
            {
                path: "login",
                component: () => import("@/views/Member/Login.vue"),
                name: "Login",
            },
            {
                path: "register",
                component: () => import("@/views/Member/Register.vue"),
                name: "Register",
            },
            {
                path: "retrievePassword",
                component: () => import("@/views/Member/RetrievePassword.vue"),
                name: "RetrievePassword",
            },
        ]
    },
    {
        path: "",
        component: Layout,
        redirect: "/index",
        meta: {title: "首页"},
        children: [
            {
                path: "index",
                component: () => import("@/views/Index/Index.vue"),
                name: "Index",
                meta: {title: "首页", icon: "home-filled"}
            }
        ]
    },
    {
        path: "",
        component: Layout,
        redirect: "/workSpace",
        meta: {title: "工作区"},
        children: [
            {
                path: "workSpace",
                component: () => import("@/views/WorkSpace/WorkSpace.vue"),
                name: "WorkSpace",
                meta: {title: "工作区", icon: "promotion"}
            }
        ]
    },
    {
        path: "/configureResources",
        name: "configureResources",
        component: Layout,
        redirect: "/configureResources/target",
        meta: {title: "配置资源", icon: "cpu"},
        children: [
            {
                path: "target",
                component: () => import("@/views/ConfigureResources/Target/Target.vue"),
                meta: {title: "配置目标服务器", icon: "memo"}
            },
        ],
    },
    {
        path: "/user",
        name: "user",
        component: Layout,
        hiddent: true,
        redirect: "/user/personalCenter",
        meta: {title: "用户"},
        children: [
            {
                path: "personalCenter",
                component: () => import("@/views/User/personalCenter/personalCenter.vue"),
                meta: {title: "个人中心"}
            },
        ],
    },
    {
        path: "/resourcesMonitoring",
        name: "resourcesMonitoring",
        component: Layout,
        redirect: "/resourcesMonitoring",
        meta: {title: "资源监控", icon: "odometer"},
        children: [
            {
                path: "systemMonitoring",
                component: () => import("@/views/ResourcesMonitoring/SystemMonitoring/systemMonitoring.vue"),
                meta: {title: "系统监控",icon: "platform"}
            },
        ],
    },
    {
        path: "/system",
        component: Layout,
        redirect: "/system/menu",
        meta: {title: "系统设置", icon: "setting"},
        name: "system",
        children: [
            {
                path: "menu",
                component: () => import("@/views/System/MenuManagement/MenuManagement.vue"),
                name: "menu",
                meta: {title: "菜单管理", icon: "menu"}
            }
        ]
    },
    {
        path: "/401",
        hiddent: true,
        component: () => import("@/views/ErrorPage/401/401.vue")
    },
    {
        path: "/:pathMatch(.*)",
        hiddent: true,
        component: () => import("@/views/ErrorPage/404/404.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 添加路由守卫 前置路由守卫
router.beforeEach((to, from, next) => {
    // 开启加载条
    NProgress.start();
    const token = getToken()
    // console.log(to.path);
    if (to.path == "/member/login" || to.path == "/member/register") {
        if (token) {
            next(from.path)
        } else {
            next()
        }
    } else {
        next()
    }
});
router.afterEach(() => {
    // 关闭加载条
    NProgress.done();
})

export default router;
