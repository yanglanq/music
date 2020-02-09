import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as getters from "./getters";// 以getters对象的形式访问该文件导出的所有数据
import * as actions from "./actions";
import createLogger from "vuex/dist/logger";// 这是一个vuex的小插件, 可以提示我们state的值在改变前后的变化
Vue.use(Vuex);
const debug = process.env.NODE_ENV!=="production";//开启调试工具, 在非生成编译的时候就启用

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug, // 开启debug选项,显示数据的变化
  plugins:debug?[createLogger()]:[]
})