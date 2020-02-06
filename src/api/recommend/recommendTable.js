//这个文件的目的在于 定义好这个表 导出

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/halfSummerMusic", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let recommendSchema = new Schema({
  category: {
    //歌单类型
    type: String,
    required: true
  },
  categoryList: [
    //歌单具体内容
    {
      id: {
        type: String,
        required: true
      },
      cover: {
        //封面
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      cnt: {
        //播放量
        type: Number,
        required: true
      }
    }
  ]
});

let recommendDatas = mongoose.model("recommendDatas", recommendSchema);

module.exports = {
  recommendTable: recommendDatas
};
