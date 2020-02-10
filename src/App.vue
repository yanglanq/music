<template>
  <div class="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
      <!--    router-view 代替了那些组件    -->
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
//引入组件
import MHeader from "./components/m-header/m-header.vue";
import tab from "./components/tab/tab";
import player from "./components/player/player";
export default {
  name: "app",
  components: {
    //组件
    "m-header": MHeader,
    tab
    ,player
  }
};
</script>

<!-- language -->
<style lang="stylus" scoped>
/* 引入 stylus */
@import "./common/stylus/variable.styl" //变量
#app
    color: $color-theme;
</style>
