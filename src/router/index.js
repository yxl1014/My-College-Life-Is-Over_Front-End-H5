import { createRouter, createWebHistory } from "vue-router";
// ()=>component: import(""),     路由懒加载
// redirect                       路由重定向
// beforeEnter(to,from,next)      独享路由守卫 to 从哪来 from 到哪去 next 放行

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "登录页面",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/index",
    component: () => import("@/views/Index/Index.vue"),
  },
  {
    path: "/home",
    name: "主页面",
    component: () => import("@/views/Home/Home.vue"),
    children: [
      {
        path: "A",
        component: () => import("@/views/Home/A/A.vue"),
      },
      {
        path: "B",
        component: () => import("@/views/Home/B/B.vue"),
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
  const token = localStorage.getItem("token");
  console.log(to.path);
  if (to.path == "/login" || to.path == "/register") {
    if (token) {
      next(from.path)
    }
    next();
  }else{
    if (!token) {
      console.log("111");
      next({ path: "/login" });
    }else{
      next();
    }
  }
});

export default router;
