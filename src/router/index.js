import Vue from "vue";
import VueRouter from "vue-router";
import rank from "../components/rank/rank";
import recommend from "../components/recommend/recommend";
import search from "../components/search/search";
import singer from "../components/singer/singer";
import tab from "../components/tab/tab";
import SingerDetail from "../components/singer-detail/singer-detail"
import disc from "../components/disc/disc";//

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
    component: recommend,
    children:[
      {
        path: ':id',
        component: disc
      }
    ]
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
    ,children:[//singer 下面的子路由
      {
        path:":id"//根据 歌手id 返回相应信息
        ,component:SingerDetail
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router; //输出 router 实例对象
