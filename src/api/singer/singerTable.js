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

let singerShema = new Schema({
    "singer_id": String, // 歌手的id
    "singer_mid": String,//方便后期获取歌手的详细信息
    "singer_name": String,//歌手名字
    "singer_pic": String,//歌手图片
});
let singer = mongoose.model("singer", singerShema);

module.exports = {//导出这个表
    singerTable: singer
};