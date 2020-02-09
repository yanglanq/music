const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/halfSummerMusic", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("连接成功")
}).catch(() => {
	console.log("连接失败")
});

let singerDetailSchema = new Schema({
	singer_name: {//歌手名字
		type:String,
		required:true
	},
	singer_mid: {//歌手mid
		type:String,
		required:true
	},
	singer_pmid: {
		type:String,
		required:true
	},
	singer_id: {//歌手 id
		type:Number,
		required:true
	},
	singerDesc: {
		type:String,
		required:true
	},
	songTotalNumber:{//歌曲总数
		type:Number,
		required:true
	},
	fansTotalNumber:{//粉丝总数
		type:Number,
		required:true
	},
	songList:[//歌曲列表
		{
			songName:{//歌曲名
				type:String,
				required:true
			},
			songMid:{//歌曲 mid
				type:String,
				required:true
			},
			songAlbum:{
				type:String,
				required:true
			}
		}
	]
});
let singerDetailTable = mongoose.model("singerDetailTables",singerDetailSchema);

module.exports={
	singerDetailTable
}

