
<template>
    <div class="recommend">
        <scroll  class="recommend-content" v-bind:data="disclist"> <!-- -->
            <div><!-- 滚动插件里面需要加一个子元素, 让内部的元素撑开高度 -->
                <div class="slider-wrapper" ref="sliderWrapper">
                    <slider>
                        <div v-for="item in sliderRecommends" v-bind:key="item.id">
                                        <a>
                                            <img v-bind:src="item.cover" alt="">
                                        </a>
                        </div>
                        <div>
                                        <a>
                                            <img v-bind:src="sliderRecommends[0].cover" alt="">
                                        </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in disclist" v-bind:key="item.id"
                            class="item"
                            @click="selectItem(item)"
                        >
                            <div class="icon">
                                <img width="60" height="60" v-bind:src="item.cover" alt="">
                            </div>
                            <div class="text">
                                                <h2 class="name" v-html="item.category"></h2>
                                                <p class="desc" v-html="item.title"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!disclist.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>


<script>
    /* eslint-disable */
    import axios from "axios"
    import Slider from "../base/slider"
    import Scroll from "../base/scroll"
    import loading from "../../../../musicdemo/src/components/base/loading";
    import {mapMutations} from "vuex"

    export default {
        data() {
            return {
                // 轮播图中歌单
                sliderRecommends: [],
                // 下面列表中歌单
                disclist:[]
            }
        },
        beforeCreate() {
            axios.get("http://localhost:9527/api/getRecommendData").then((data) =>
            {
                //获取到歌单数据 并存储
                this.sliderRecommends = data.data.shift().categoryList;
                setTimeout(()=>{
                    data.data.forEach((item)=>{
                        item.categoryList.forEach((item1)=>{
                            item1.category = item.category;
                            this.disclist.push(item1);
                        })
                    })
                },2000)

            })
        },
        components: {
            Slider
            ,Scroll
            ,loading
        },
        methods:{
	        ...mapMutations({
		        setDisc:"SET_DISC"
	        }),
        	selectItem(item){
                axios.get(`http://localhost:9527/api/getRecommendDetailData/${item.id}`).then(da=>{
	                let disc;
                	if(da.data[0]){
		                disc = da.data[0];
                    }else{
		                disc = da.data
                    }
                	this.setDisc(disc);//设置专辑
	                this.$router.push(`/recommend/${item.id}`)//进行路由跳转
                })
            },

        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0

        .recommend-content
            height: 100%
            overflow: hidden

            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden

            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme

                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px

                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px

                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium

                        .name
                            margin-bottom: 10px
                            color: $color-text

                        .desc
                            color: $color-text-d

            .loading-container
                position: absolute
                width: 100%
                top: 80%
                transform: translateY(-50%)
</style>
