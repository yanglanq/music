<template>
    <div class="song-list">
        <ul>
            <li
                    v-for="(song,index) in songs" class="item"
                    v-bind:key="song.songMid"
                    @click="selectItem(song,index)"
            >
                <div class="content">
                              <h2 class="name">{{song.songName}}</h2>
                              <p class="desc">{{song.singerName?  song.singerName : singername}} -- {{song.songAlbum}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
		name:"song-list"
	    ,props:{
			songs:{
				type:Array
			},
			singername:{//歌手名
				type:String
			}
		},
		created() {
			// eslint-disable-next-line no-console
			// console.log(this.songs[0].singer)
		},
        methods:{
	        selectItem(song,index){
				this.$emit("select",song,index)
            },

        },
        computed:{
	        getSingerName(song){
		        if(this.songs[0].singer){
			        return song.singer[0].name
		        }else{
			        return this.singername
		        }
	        }
        }

	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable.styl"
    @import "../../common/stylus/mixin.styl"

    .song-list
        .item
            display: flex
            align-items: center
            box-sizing: border-box
            height: 64px
            font-size: $font-size-medium

            .rank
                flex: 0 0 25px
                width: 25px
                margin-right: 30px
                text-align: center

                .icon
                    display: inline-block
                    width: 25px
                    height: 24px
                    background-size: 25px 24px

                    &.icon0
                        bg-image('first.png')

                    &.icon1
                        bg-image('second.png')

                    &.icon2
                        bg-image('third.png')

                .text
                    color: $color-theme
                    font-size: $font-size-large

            .content
                flex: 1
                line-height: 20px
                overflow: hidden

                .name
                    no-wrap()
                    color: $color-text

                .desc
                    no-wrap()
                    margin-top: 4px
                    color: $color-text-d
</style>