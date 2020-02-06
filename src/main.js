import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 引用路由
// import store from "./store";
import "./common/stylus/index.styl"; //引入css文件

//解决移动端三百毫秒延迟问题 fastclick 组件
import attachFastClick from "fastclick";
attachFastClick.attach(document.body); //激活组件

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app"); //挂载
