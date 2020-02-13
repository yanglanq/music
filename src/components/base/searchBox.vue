<template>
    <div class="search-box">
        <i class="icon-search"></i> <!-- 搜索图标 -->
        <input ref="query" v-model="queryEvent" class="box"
               :placeholder="placeholder"
        /> <!-- 搜索框 -->
        <i @click="clear" v-show="queryEvent" class="icon-dismiss"></i> <!-- 取消按钮 当输入了搜索字符的时候显示-->
    </div>
</template>

<script >
	import {debounce} from '../../common/js/util' //获得延迟触发函数, 类似防抖效果

	export default {
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data() {
			return {
				queryEvent: ''
			}
		},
		methods: {
			clear() {
				this.query = ''
			},
			setQuery(query) {
				this.query = query
			}
		},
		watch:{
			queryEvent(newQuery){
				this.$emit('query', newQuery)//向父组件发送搜索关键词
			},
		}
	}
</script>

<style scoped lang="stylus" >
    @import "../../common/stylus/variable.styl"

    .search-box
        display: flex
        align-items: center
        box-sizing: border-box
        width: 100%
        padding: 0 6px
        height: 40px
        background: $color-highlight-background
        border-radius: 6px
        .icon-search
            font-size: 24px
            color: $color-background
        .box
            flex: 1
            margin: 0 5px
            line-height: 18px
            background: $color-highlight-background
            color: $color-text
            font-size: $font-size-medium
            &::placeholder
                color: $color-text-d
        .icon-dismiss
            font-size: 16px
            color: $color-background
</style>