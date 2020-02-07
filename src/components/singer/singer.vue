<template>
    <div class="singer">
        <listview :data="singerList"></listview>
    </div>
</template>

<script>
    import axios from "axios"
    import listview from "../base/listview";
    export default {
        name: "singer"
        ,data(){
            return{
              singerList:[]
            }
        }
        ,created() {// created 最适合发送数据请求
            axios.get("http://localhost:9527/api/getSingerData").then(data=>{
                this.singerList = data.data;
                console.log(this.singerList)
            })
        }
        ,components:{
            listview
        }
    };
</script>

<style scoped lang="stylus">
    .singer
        position :fixed
        top :88px
        bottom :10px
</style>
