import * as types from "./mutations-type"
//动作
export const selectPlay = function (
	{commit},//动作为 commit
	{list, index}
) {
	commit(types.SET_PLAYLIST,list);//设置播放列表
	commit(types.SET_CURRENT_INDEX,index);//设置当前歌曲索引
	commit(types.SET_SEQUENCE_LIST,list);//设置顺序播放列表
	commit(types.SET_FULL_SCREEN,true);//全屏播放
	commit(types.SET_PLAYING_STATE,true);//设置播放器状态为 true
}

// 在 methods 中用 ...mapActions([]) 使用