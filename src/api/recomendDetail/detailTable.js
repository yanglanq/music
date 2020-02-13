//这个文件的目的在于 定义好这个表 导出
//歌单中具体歌曲的信息

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose
	.connect("mongodb://127.0.0.1:27017/halfSummerMusic", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("连接数据库成功");
	})
	.catch(err => {
		console.log("连接数据库失败");
	});

let recommendDetailSchema = new Schema({
	id: {
		//用于后期的识别 歌单id
		type: String,
		required: true
	},
	cover: {
		//歌单封面
		type: String,
		required: true
	},
	title: {
		//歌单名
		type: String,
		required: true
	},
	tag: [
		{
			id: {
				//类型 id
				type: String,
				required: true
			},
			name: {
				//歌单类型
				type: String,
				required: true
			}
		}
	],
	songList: [
		{
			songMid: {
				//通过它来获取音乐数据
				type: String,
				required: true
			},
			songName: {
				//歌曲名
				type: String,
				required: true
			},
            songAlbum:{
                type: String,
                required: true
            },
			singerName:{
				type: String,
				required: true
			}
		}
	]
});

let recommendDetailTable = mongoose.model(
	"recommendDetailTable",
	recommendDetailSchema
);

module.exports = {
	recommendDetailTable
};
