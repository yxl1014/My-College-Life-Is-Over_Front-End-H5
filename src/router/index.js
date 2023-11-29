import { createRouter, createWebHistory } from "vue-router";
import {getToken} from "@/utils/auth";
// ()=>component: import(""),     路由懒加载
// redirect                       路由重定向
// beforeEnter(to,from,next)      独享路由守卫 to 从哪来 from 到哪去 next 放行
import Layout from "@/Layout/index.vue"
import Member from "@/Layout/Member/Member.vue"
import * as path from "path";
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path:"/member",
    component:Member,
    redirect: "/member/login",
    children: [
      {
        path:"login",
        component:()=>import("@/views/Member/Login.vue"),
        name:"Login",
      },
      {
        path:"register",
        component:()=>import("@/views/Member/Register.vue"),
        name:"Register",
      },
      {
        path:"retrievePassword",
        component:()=>import("@/views/Member/RetrievePassword.vue"),
        name:"RetrievePassword",
      },

    ]
  },
  // {
  //   path: "/login",
  //   name: "登录页面",
  //   component: () => import("@/views/Login/Login.vue"),
  // },
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children:[
      {
        path:"index",
        component:() => import("@/views/Index/Index.vue"),
        name:"Index",
        meta:{title:"首页"}
      }
    ]
  },
  {
    path: "/home",
    name: "主页面",
    component: Layout,
    redirect: "/home/A",
    meta:{title:"Home"},
    children: [
      {
        path: "A",
        component: () => import("@/views/Home/A/A.vue"),
        meta:{title:"A"}
      },
      {
        path: "B",
        component: () => import("@/views/Home/B/B.vue"),
        meta:{title:"B"}
      },
    ],
  },
  {
    path:"/401",
    component:()=>import("@/views/401/401.vue")
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/404/404.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加路由守卫 前置路由守卫
router.beforeEach((to, from, next) => {
  const token =getToken()
  console.log(to.path);
  if (to.path == "/member/login" || to.path == "/member/register") {
    if (token) {
      next(from.path)
    }else{
      next()
    }
  }else{
    next()
  }
});

export default router;
