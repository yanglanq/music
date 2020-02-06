import Vue from "vue";
import VueRouter from "vue-router";
import rank from "../components/rank/rank";
import recommend from "../components/recommend/recommend";
import search from "../components/search/search";
import singer from "../components/singer/singer";
import tab from "../components/tab/tab";

Vue.use(VueRouter); //调用 VueRouter 中间件
//编写路由
const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/rank",
    component: rank
  },
  {
    path: "/recommend",
    component: recommend
  },
  {
    path: "/search",
    component: search
  },
  {
    path: "/tab",
    component: tab
  },
  {
    path: "/singer",
    component: singer
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router; //输出 router 实例对象
