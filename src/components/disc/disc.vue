<template>
    <transition name="slide">
        <music-list :title="title" :bgImg="bgImage" :songList="songlist"></music-list>
    </transition>
</template>

<script>
	import MusicList from '../music-list/music-list'
	import {mapGetters} from 'vuex'
	export default {
		name:"disc",
		computed: {
			title() {
				return this.disc.title
			},
			bgImage() {
				return this.disc.cover
			},
			...mapGetters([
				'disc'
			])
		},
		data() {
			return {
				songlist: []
			}
		},
		created() {
			this.songlist=this.disc.songList;

		},
		components: {
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
