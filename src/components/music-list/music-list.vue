<template>
      
    <div class="music-list">
        <div class="back" @click="goBack">
                  <i class="icon-back"></i>
        </div>
        <h1 class="title" ref="singername">
         {{title}}
        </h1>
        <div class="bg-image" :style="bgStyle" ref="bgImg">
            <div class="play-wrapper" v-show="songList.length>0" >
                <!-- 设置随机播放选项的按钮, 该按钮在songlist数据传输进来之后再显示出来 -->
                <div class="play" ref="playBtn">
                    <!-- 添加一个引用, 当蒙版移动到顶部的时候, 我们就对这个按钮做一些操作 -->
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div> <!-- 模糊层, 加点滤镜效果 -->
        </div>
        <div class="bg-layer" ref="layer">
            <!-- 新建的蒙版元素 -->
        </div>
        <Scroll :data="songList" class="list" ref="list"
                @scroll="scroll"
                :probeType="probeType"
                :listen-scroll="listenScroll"
        >
            <!-- 必须用一个 div 撑开 -->
            <div>
                <div class="song-list-wrapper">
                    <songList
                        :songs="songList" :singername="title"
                    >

                    </songList>
                </div>
            </div>
            <div class="loading-container" v-show="!songList.length">
                <loading></loading>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import songList from "../base/song-list";
    import Scroll from "../base/scroll";
    import loading from "../base/loading";
	export default {
		props: { //接受传进来的props参数
			bgImg:{// 歌手图片
				type:String
			},
			songList:{
				type: Array
			},
			title:{
				type:String
			}
		},
		computed:{
			bgStyle(){
				return `background-image:url(${this.bgImg})`;
			},
		},
		methods:{
			goBack(){// 点击回到上级路由
				this.$router.go(-1);
			}
			,scroll(pos){
				this.scrollY = pos.y;
			}
		}
		,components:{
			songList
            ,Scroll
            ,loading
        }
        ,mounted() {
			this.$refs.list.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
		    this.translateY = this.$refs.bgImg.clientHeight-this.$refs.singername.clientHeight;
			}
        ,data(){
			return{
				scrollY:0
                ,probeType:3
                ,listenScroll:true
            }
        }
        ,watch:{
			scrollY(newY){
				//当 scroll 组件发生了滚动，我们判断向上的滚动值，然后给蒙版设置
				//当scrollY的值发生变化的时候, 我们就触发一个事件, 这个值的变化源自于scroll组件传递过来的数据
				//做一个限制, 不要让遮盖全部滚上去了, 留一个顶部的歌手名称的位置
				//那么 向上移动的限制就是 (图片的高度-文字的高度), 记住元素向上滑动,那么最终就是负值
				let maxTranslateY = Math.max(-this.translateY,newY);
				console.log(-this.translateY,newY)
				//设置新的偏移量
				this.$refs.layer.style["transform"] =
					`translate3d(0,${maxTranslateY}px,0)`;
				if(newY<(-this.translateY)){
					this.$refs.bgImg.style.zIndex=10;
					this.$refs.bgImg.style.paddingTop=0;

					this.$refs.bgImg.style.height=`${this.$refs.singername.clientHeight}px`;
				}else{
					this.$refs.bgImg.style.zIndex=0;
					this.$refs.bgImg.style.paddingTop="70%";
					this.$refs.bgImg.style.height=0;
				}
			}
        }
	};
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

    .loading
        position :fixed
        top :40%
    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background

        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50

            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme

        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text

        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover

            .play-wrapper
                position: absolute
                bottom: 20px
                z-index: 50
                width: 100%

                .play
                    box-sizing: border-box
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto
                    text-align: center
                    border: 1px solid $color-theme
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0

                    .icon-play
                        display: inline-block
                        vertical-align: middle
                        margin-right: 6px
                        font-size: $font-size-medium-x

                    .text
                        display: inline-block
                        vertical-align: middle
                        font-size: $font-size-small

            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7, 17, 27, 0.4)

        .bg-layer
            position: relative
            height: 100%
            background: $color-background

        .list
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            background: $color-background

            .song-list-wrapper
                padding: 20px 30px

            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>