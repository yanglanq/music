<template>
    <transition name="slide">
        <musiclist
            :title="title" :bgImg="bgImg" :songList="songList"
        >
        </musiclist>
    </transition>
</template>

<script>
    import musiclist from "../music-list/music-list"
    import {mapGetters} from "vuex"
    import axios from "axios"
	export default {
		name: "singer-detail"
        ,computed:{
			...mapGetters([//里面是一个数组
				"singer"
            ])
            ,title(){
				return this.singer.singer_name;
            }
            ,bgImg(){
				return this.singer.singer_pic
            }
            ,mid(){
				return this.singer.singer_mid
            }
        }
        ,data(){
			return{
				songList:[]//具体的歌曲信息
            }
        }
        ,created() {
            this._getDetail(this.mid);
		}
		,methods:{
			_getDetail(mid){
				let data = {
					mid:mid
                }
                axios.post("http://localhost:9527/api/getSingerDetailData",JSON.stringify(data)).then((da)=>{
	                if(da.data.songList){
		                this.songList = da.data.songList
                    }else{
		                this.songList = da.data[0].songList
                    }
	                console.log(this.songList)
                }).catch(err=>{
                	throw err;
                })
            }
        }
		,components:{
			musiclist
        }
	}
</script>

<style scoped lang="stylus">
    .slide-enter-active, .slide-leave-active
        transition :all 0.3s
    .slide-enter, .slide-leave-to
        transform :translate3d(100%,0,0);
</style>