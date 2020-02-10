import {playMode} from "../common/js/config";

const state = {
	singer:{}//歌手数据
	,playing:false//播放器状态
	,fullScreen:false//播放界面是否全屏
	,playlist:[]//播放列表
	,sequenceList:[]//顺序播放列表
	,playMode:playMode.sequence//播放格式 默认顺序播放
	,currentIndex:-1//当前播放的歌曲，默认不播放就是 -1
}
export default state;