<template>
    <div class="player" v-show="playlist.length>0">
        <transition name="normal"
            @enter="enter"
            @leave="leave"
            @after-enter="afterEnter"
            @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
                <!-- 大的背景图 占据所有-->
                <div class="background">
                    <img src="" alt="" width="100%"
                         height="100%"
                         :src="songData.songPic"
                    >
                </div><!-- 需要一个朦胧层-->
                <div class="top">
                    <div class="back"
                         @click="miniScream"
                    ><!-- 返回按钮 切换迷你播放器 -->
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-text="songData.songName"></h1><!-- 歌曲名称 -->
                    <h2 class="subtitle" v-text="singer.singer_name"></h2><!-- 歌手名称 -->
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper"> <!-- 歌曲唱片设计 -->
                            <div class="cd">
                                <img :src="songData.songPic" alt="" class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators"><!-- 控制按钮区 -->
                        <div class="icon i-left">
                            <i class="icon-sequence"></i><!-- 顺序播放 -->
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i><!-- 上一首 -->
                        </div>
                        <div class="icon i-center">
                            <i class="icon-play"></i><!-- 播放按钮 -->
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i><!-- 下一首 -->
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i><!-- 上一首 -->
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 全屏播放器 -->
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen">
                <div class="icon"
                     @click="full"
                ><!-- 小型唱片 -->
                    <img width="40" height="40" :src="singer.singer_pic">
                </div>
                <div class="text">
                    <h2 class="name" v-text="songData.songName"></h2>
                    <p class="desc" v-text="singer.singer_name"></p>
                </div>
                <div class="control">

                </div>
                <div class="control">
                    <div class="icon-playlist"></div>
                </div>
            </div>
        </transition>
        <!-- 迷你播放器 -->

    </div>
</template>
<script>
	import {mapGetters} from "vuex";
	import {mapMutations} from "vuex"
    import axios from "axios"
    import animations from "create-keyframe-animation"

	export default {
		name: "player",
        data(){
			return{
				songData:{}
            }
        },
		computed:{
			//得到基本参数, 当传入的播放列表的时候展开播放器, 并根据播放器的fullscreen参数的不同,选择全屏或是迷你播放器
			...mapGetters([
				"fullScreen",//是否全屏
				"playlist",//播放列表
                "currentSong",//当前歌曲
                "singer",//当前歌手
			])

		}
		,watch:{
			currentSong(){//当前歌曲
				let data = {
					mid:this.currentSong.songMid//获取歌曲 mid，便于后面获取歌曲数据

                }
                axios.post("http://localhost:9527/api/getSongDetailData",JSON.stringify(data)).then(da=>{
	                console.log(da)
                    if(Array.isArray(da.data)){//da 是数组
                    	this.songData = da.data[0]
                    }else{
	                    this.songData = da.data
                    }
                })

            }
        }
        ,methods:{
            ...mapMutations({
                setFullScreen:"SET_FULL_SCREEN"
            })
			,miniScream(){
				this.setFullScreen(false)
            }
            ,full(){
				this.setFullScreen(true)
            }
            ,_getPosAndScale() { //获取基本位置
				//定义小图元素的尺寸参数数据 数据固定
				const targetWidth = 40;
				//定义小图元素的位置参数
				const paddingLeft = 40;
				const paddingBottom = 30;
				const paddingTop = 80;

				//定义大图尺寸
				const width = window.innerWidth * 0.8;
				const scale = targetWidth / width; // 计算大小图缩放比例 小图宽度/大图宽度
				const x = -(window.innerWidth / 2 - paddingLeft);// x偏移量  大图到小图, 移动负值
				const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
				// 向下移动,为正值 因为图形是原型, 所以高的一半也就是宽的一半
				return {
					x,//向左移大小
					y,//向右移大小
					scale//缩小放大比例
				}
			}
            ,enter(el,done){
				//el:绑定的元素
				//done: 执行下一个钩子, 和express中间件的next逻辑一致
				// eslint-disable-next-line no-console
				console.log(el,done);
				//获取基本参数
				const {x, y, scale} = this._getPosAndScale()

				//定义动画
				let animation = {
					//从小图的位置, 挪动到大图的值
					0: {// 0% 的时候 加上这个属性，会产生这个动画
						transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0,0,0) scale(1.1)`
					},
					100: {
						transform: `translate3d(0,0,0) scale(1)`
					}
				};

				animations.registerAnimation({
					name: 'move', //动画名称
					animation, //动画内容
					presets: {
						duration: 400, //动画时间
						easing: 'linear' //动画速度
					}
				});

				animations.runAnimation(this.$refs.cdWrapper, 'move', done);//执行动画的元素 动画名称
				//激活动画 cdWrapper是middle元素里面的额class名称为 cd-wrapper的元素
			},
			afterEnter(){
				animations.unregisterAnimation('move');//执行完成动画后, 解除注册动画
				this.$refs.cdWrapper.style.animation = '' // 清除动画内容
			},
			leave(el,done){
				this.$refs.cdWrapper.style.transition = 'all 0.4s' ;// 设置基本的动画过渡时间
				const {x, y, scale} = this._getPosAndScale(); // 获取基本参数
				this.$refs.cdWrapper.style["transform"] = `translate3d(${x}px,${y}px,0) scale(${scale})`;// 从大到小
				this.$refs.cdWrapper.addEventListener('transitionend', done);// 监听动画是否结束, 结束之后执行下一步骤 跳到下一个钩子
			},
			afterLeave(){
				this.$refs.cdWrapper.style.transition = ''; //清空过渡时间
				this.$refs.cdWrapper.style["transform"] = ''; // 清空动画
			}
        }
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"
    .player
        .normal-player
            position: fixed
            left: 0
            right: 0
            top: 0
            bottom: 0
            z-index: 150
            background: $color-background

            .background
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                z-index: -1
                opacity: 0.6
                filter: blur(20px)

            .top
                position: relative
                margin-bottom: 25px

                .back
                    position absolute
                    top: 0
                    left: 6px
                    z-index: 50

                    .icon-back
                        display: block
                        padding: 9px
                        font-size: $font-size-large-x
                        color: $color-theme
                        transform: rotate(-90deg)

                .title
                    width: 70%
                    margin: 0 auto
                    line-height: 40px
                    text-align: center
                    no-wrap()
                    font-size: $font-size-large
                    color: $color-text

                .subtitle
                    line-height: 20px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-text

            .middle
                position: fixed
                width: 100%
                top: 80px
                bottom: 170px
                white-space: nowrap
                font-size: 0

                .middle-l
                    display: inline-block
                    vertical-align: top
                    position: relative
                    width: 100%
                    height: 0
                    padding-top: 80%

                    .cd-wrapper
                        position: absolute
                        left: 10%
                        top: 0
                        width: 80%
                        height: 100%

                        .cd
                            width: 100%
                            height: 100%
                            box-sizing: border-box
                            border: 10px solid rgba(255, 255, 255, 0.1)
                            border-radius: 50%

                            &.play
                                animation: rotate 20s linear infinite

                            &.pause
                                animation-play-state: paused

                            .image
                                position: absolute
                                left: 0
                                top: 0
                                width: 100%
                                height: 100%
                                border-radius: 50%

                    .playing-lyric-wrapper
                        width: 80%
                        margin: 30px auto 0 auto
                        overflow: hidden
                        text-align: center

                        .playing-lyric
                            height: 20px
                            line-height: 20px
                            font-size: $font-size-medium
                            color: $color-text-l

                .middle-r
                    display: inline-block
                    vertical-align: top
                    width: 100%
                    height: 100%
                    overflow: hidden

                    .lyric-wrapper
                        width: 80%
                        margin: 0 auto
                        overflow: hidden
                        text-align: center

                        .text
                            line-height: 32px
                            color: $color-text-l
                            font-size: $font-size-medium

                            &.current
                                color: $color-text

            .bottom
                position: absolute
                bottom: 50px
                width: 100%

                .dot-wrapper
                    text-align: center
                    font-size: 0

                    .dot
                        display: inline-block
                        vertical-align: middle
                        margin: 0 4px
                        width: 8px
                        height: 8px
                        border-radius: 50%
                        background: $color-text-l

                        &.active
                            width: 20px
                            border-radius: 5px
                            background: $color-text-ll

                .progress-wrapper
                    display: flex
                    align-items: center
                    width: 80%
                    margin: 0px auto
                    padding: 10px 0

                    .time
                        color: $color-text
                        font-size: $font-size-small
                        flex: 0 0 30px
                        line-height: 30px
                        width: 30px

                        &.time-l
                            text-align: left

                        &.time-r
                            text-align: right

                    .progress-bar-wrapper
                        flex: 1

                .operators
                    display: flex
                    align-items: center

                    .icon
                        flex: 1
                        color: $color-theme

                        &.disable
                            color: $color-theme-d

                        i
                            font-size: 30px

                    .i-left
                        text-align: right

                    .i-center
                        padding: 0 20px
                        text-align: center

                        i
                            font-size: 40px

                    .i-right
                        text-align: left

                    .icon-favorite
                        color: $color-sub-theme

            &.normal-enter-active, &.normal-leave-active
                transition: all 0.4s

                .top, .bottom
                    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)

            &.normal-enter, &.normal-leave-to
                opacity: 0

                .top
                    transform: translate3d(0, -100px, 0)

                .bottom
                    transform: translate3d(0, 100px, 0)

        .mini-player
            display: flex
            align-items: center
            position: fixed
            left: 0
            bottom: 0
            z-index: 180
            width: 100%
            height: 60px
            background: $color-highlight-background

            &.mini-enter-active, &.mini-leave-active
                transition: all 0.4s

            &.mini-enter, &.mini-leave-to
                opacity: 0

            .icon
                flex: 0 0 40px
                width: 40px
                padding: 0 10px 0 20px

                img
                    border-radius: 50%

                    &.play
                        animation: rotate 10s linear infinite

                    &.pause
                        animation-play-state: paused

            .text
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 20px
                overflow: hidden

                .name
                    margin-bottom: 2px
                    no-wrap()
                    font-size: $font-size-medium
                    color: $color-text

                .desc
                    no-wrap()
                    font-size: $font-size-small
                    color: $color-text-d

            .control
                flex: 0 0 30px
                width: 30px
                padding: 0 10px

                .icon-play-mini, .icon-pause-mini, .icon-playlist
                    font-size: 30px
                    color: $color-theme-d

                .icon-mini
                    font-size: 32px
                    position: absolute
                    left: 0
                    top: 0

    @keyframes rotate
        0%
            transform: rotate(0)
        100%
            transform: rotate(360deg)
</style>
