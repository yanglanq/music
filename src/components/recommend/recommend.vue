<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper">
                <slider loop><!-- loop 表示循环播放 -->
                    <div v-for="item in sliderRecommends" v-bind:key="item.id">
                        <a href="">
                            <img v-bind:src="item.cover" alt="" >
                        </a>
                    </div>
                    <!-- 为了循环播放准备的 div -->
                    <div>
                        <a href="">
                            <img v-bind:src="sliderRecommends[0].cover" alt="" >
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from "axios"
    import Slider from "../base/slider"
    export default {
        data() {
            return {
                sliderRecommends: []
            }
        },
        beforeCreate() {
            axios.get("http://localhost:9527/api/getRecommendData").then((data) =>
            {
                //获取到歌单数据 并存储
                this.sliderRecommends = data.data.shift().categoryList;
            })
        },
        components: {
            Slider
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
