<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <!-- 插槽 -->
            <slot>
            </slot>
        </div>
        <div class="dots">
            <!-- 下面的小点点 -->
            <span class="dot"
                  v-bind:class="{active: currentPageIndex === index }"
                  v-for="(item, index) in dots"
                  v-bind:key="item" v-bind:index="index"
                  @click="_click(index)"
            >
            </span>
        </div>
    </div>
</template>

<script>
    import {addClass} from '../../common/js/dom'
    import BScroll from 'better-scroll'

    export default {
        name: 'slider',
        props: {
            //循环轮播
            loop: {//默认不循环
                type: Boolean,
                default: false
            },
            //自动轮播
            autoPlay: {
                type: Boolean,
                default: true
            },
            //自动轮播的时间参数
            interval: {
                type: Number,
                default: 3000
            }
        },
        data() {
            return {
                dots: [],//小点点
                currentPageIndex: 0//当前所在 索引
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth();// 设置 slider 的总宽度
                this._initDots();// 初始化小点点
                this._initSlider();// 初始化 slider

                if (this.autoPlay) {// 是否自动播放
                    this._play()
                }
            }, 25);
            window.addEventListener('resize', () => {
                // this.slider 是 better-scroll 的实例
                if (!this.slider) {
                    return;
                }
                this._setSliderWidth(true);//重新设置 slider 宽度
                this.slider.refresh();//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
            })
        },
        destroyed() {
            clearTimeout(this.timer)
        },
        methods: {
            //设置slider的宽度
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;
                //拿到子元素的个数, 根据图片的个数渲染出对应的dot的个数
                let width = 0;//默认宽度值为0, 后面再增加
                let sliderWidth = this.$refs.slider.clientWidth;//获取整个的slider的宽度\
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');//设置对应好的样式名称,方便样式的装饰灯\等
                    child.style.width = sliderWidth + 'px';//设置每张图片的宽度
                    width += sliderWidth;//总宽度等于单个图片的宽度*个数
                }
                if (this.loop && !isResize) {//循环播放
                    // width += 2 * sliderWidth;
                    width += sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px' // 设置整个滑动组件的总宽度
            },
            _initSlider() {
                //初始化一个silder组件
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                })

                //监听滚动事件 当翻到下一页结束后,改变索引, 得到小圆点的变化效果
                this.slider.on('scrollEnd', () => {
                    //获取当前的第几个子元素
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    this.currentPageIndex = pageIndex;//存储一下当前的页面索引值
                    if (this.autoPlay) {// 如果开启了自动播放, 那么就清楚定时器并手动再启动一次
                        clearTimeout(this.timer);
                        this._play()
                    }
                })
            },
            _initDots() {
                this.dots = new Array(this.children.length-1)
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1;
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval)
            },
            _click(index) {
                let pageIndex = index;
                this.currentPageIndex = index;
                this.slider.goToPage(pageIndex, 0, 400);
                clearTimeout(this.timer);
                this._play()
            }
        },
        watch:{
            currentPageIndex:function (newIndex) {
                if(newIndex===4){//监听轮播滚动到最后一个了
                    this.currentPageIndex = 0;
                    this.slider.goToPage(this.currentPageIndex, 0, 0);
                    // 瞬间回到第一个 正好与滚动动画相衔接
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/variable.styl"

  .slider
    min-height: 1px

    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap

      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center

        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none

        img
          display: block
          width: 100%

    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0

      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l

        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>