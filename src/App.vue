<template>
    <div id="app">
        <m-header></m-header>
    </div>
</template>

<script>

    import Mheader from "./components/m-header/m-header.vue";
    export default {
        name: "#app"
        , components: {
            "m-header":Mheader
        }
    }
</script>

<!-- language -->
<style lang="stylus" scoped>
    /* 引入 stylus */
    @import "./common/stylus/variable.styl" //变量
    #app
        color: $color-theme;

</style>
