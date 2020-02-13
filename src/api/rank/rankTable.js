const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/halfSummerMusic", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	// eslint-disable-next-line no-console
	console.log("连接成功")
}).catch(() => {
	// eslint-disable-next-line no-console
	console.log("连接失败")
});
let rankShema = new Schema({
	picUrl:{//图片
		type:String,
		required:true
	},
	intro:{//排行简介
		type:String,
		required:true
	},
	title:{//标题
		type:String,
		required:true
	},
	topId:{//排行榜 id 通过其获取排行的具体信息
		type:Number,
		required:true
	},
	songlist:[
		{
			songName:{//歌曲名称
				type:String,
				required:true
			},
			albumMid:{//专辑 mid
				type:String,
				required:true
			},
			singerName:{//歌手姓名
				type:String,
				required:true
			},
			singerMid:{//歌曲 mid
				type:String,
				required:true
			}
		}
	]

})
let rankData = mongoose.model("rankDatas", rankShema);
module.exports={
	rankTable:rankData
}