import * as types from "./mutations-type" //导入
// 这样后期就可以通过对象属性的方式访问, 简单明了

const mutations = {
	[types.SET_SINGER](state,singerData){
		state.singer = singerData;
	}
}

export default mutations;