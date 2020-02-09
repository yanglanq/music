<template>
    <div class="singer">
        <listview
                :data="singerList"
                @select="selectSinger"
        ></listview>
        <router-view>

        </router-view>
    </div>
</template>

<script>
    import axios from "axios"
    import listview from "../base/listview";
    import {mapMutations} from "vuex"
    import singerdetail from "../singer-detail/singer-detail"
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
            })
        }
        ,components:{
            listview
        }
        ,methods:{
            ...mapMutations({//获取 vuex 中的mutation方法
                setSinger:"SET_SINGER"
            })
            ,selectSinger(singerItem){
                this.$router.push({//进行路由跳转
                    path:`/singer/${singerItem.singer_mid}`
                });
                // 该变 vuex 中数据
                this.setSinger(singerItem);
            }
        }
    };
</script>

<style scoped lang="stylus">
    .singer
        position :fixed
        top :88px
        bottom :10px
</style>
