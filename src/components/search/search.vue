<template>
    <div class="search">
        <div class="search-box-wrapper">
            <searchBox ref="searchBox"
              @query="searchData"
            ></searchBox>
        </div>

        <!--  -->
        <div class="shortcut-wrapper">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li v-for="(item,index) in hotKey " v-bind:key="index" class="item"
                            v-on:click="setKey(item)">
                            <span> {{item.key}} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="searchList" v-show="songs">
            <songlist :songs="songs" :singername="''" @select="selectItem">

            </songlist>
        </div>
    </div>
</template>

<script>
	import searchBox from "../base/searchBox";
	import axios from "axios";
	import songlist from "../base/song-list"
    import {mapActions} from "vuex"

	export default {
		data() {
			return {
				hotKey: [],//热词
				nowKey: '',
                songs:[]
			}
		},
		components: {
			searchBox,
            songlist
		},
		created() {
			axios.get("http://localhost:9527/api/getHotKey").then((data) => {
				this.hotKey = data.data;
			})
		},
		methods: {
		    ...mapActions([
                "selectPlay"
            ]),
			setKey(item) {
				this.$refs.searchBox.setQuery(item.key);
				//直接调用 searchBox 的方法
			},
            searchData(query){
			    axios.get(`http://localhost:9527/api/getSearchResult/${query}`).then(da=>{
			        this.songs = da.data.songlist
                })
            },
            selectItem(item,index){
		        this.selectPlay({
                    index:index,
                    list:this.songs
                })
            }
		}
	}
</script>


<style lang="stylus" scoped>
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

    .search
        .search-box-wrapper
            margin: 20px

        .shortcut-wrapper
            /*position: fixed*/
            /*top: 178px*/
            /*bottom: 0*/
            /*width: 100%*/

            .shortcut
                height: 100%
                overflow: hidden

                .hot-key
                    margin: 0 20px 20px 20px

                    .title
                        margin-bottom: 20px
                        font-size: $font-size-medium
                        color: $color-text-l

                    .item
                        display: inline-block
                        padding: 5px 10px
                        margin: 0 20px 10px 0
                        border-radius: 6px
                        background: $color-highlight-background
                        font-size: $font-size-medium
                        color: $color-text-d

                .search-history
                    position: relative
                    margin: 0 20px

                    .title
                        display: flex
                        align-items: center
                        height: 40px
                        font-size: $font-size-medium
                        color: $color-text-l

                        .text
                            flex: 1

                        .clear
                            extend-click()

                            .icon-clear
                                font-size: $font-size-medium
                                color: $color-text-d

        .search-result
            /*position: fixed*/
            /*width: 100%*/
            /*top: 178px*/
            /*bottom: 0*/
        .searchList
          padding 0 20px
</style>