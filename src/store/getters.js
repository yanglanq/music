//获取数据
export const singer = state => state.singer;
export const playing = state => state.playing;
export const playlist = state => state.playlist;
export const sequenceList = state => state.sequenceList;
export const fullScreen = state => state.fullScreen;
export const playMode = state => state.playMode;
export const currentIndex = state => state.currentIndex;//当前歌曲索引
export const currentSong = (state) => {//当前歌曲
	//类似于一个计算属性, 做一个防错处理,
	return state.playlist[state.currentIndex]||{};
};

//在 computed 中用 ...mapGetters([]) 使用，用于获取数据