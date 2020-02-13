const bodyParser = require("body-parser");
const express = require("express");
let app = express();
//允许跨域请求
app.all("*", function(req, res, next) {
    res.header("X-Powered-By", " 3.2.1");
    res.header({
        "Access-Control-Allow-Credentials": true
        ,"Access-Control-Allow-Origin": req.headers.origin || "*"
        ,"Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
        ,"Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
        ,"Content-Type":"application/json;charset=utf-8"
    })
    /*让options请求快速返回*/
    if (req.method === "OPTIONS") res.status(200).send("OK");
    else next();
});
// bodyParser 帮助解析数据
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const {getRecommendData} = require("./recommend/getRecommendData");
const {getRecommendDetailData} = require("./recomendDetail/setDetailData");
const {getSingerData} = require("./singer/getSingerData");
const {getSingerDetailData} = require("./singerDetailTable/getSingerDetail");
const {getSongDetailData} = require("./songDetail/getSongDetail")
const {getLyricData} = require("./lyric/getLyric")
const {getRankData} = require("./rank/getRankData")
const {getRankDetail}= require("./rank/getRankDetail")
const {getHotKey} = require("./hotKey/getHotKey")
const {getSearchResult} = require("./search/getSearchData")

//推荐页 歌单数据
app.get("/api/getRecommendData",getRecommendData);
//获取推荐页详细数据
app.get("/api/getRecommendDetailData/:id",getRecommendDetailData);
//获取歌手列表数据
app.get("/api/getSingerData",getSingerData);
//获取歌手详细数据
app.post("/api/getSingerDetailData",getSingerDetailData)
//获取歌曲详细数据
app.post("/api/getSongDetailData",getSongDetailData);
//获取歌词数据
app.post("/api/getLyricData",getLyricData);
//获取榜单数据
app.get("/api/getRankData",getRankData);
//获取榜单具体歌曲数据
app.get("/api/getRankDetail/:id",getRankDetail);
//获取热刺数据
app.get("/api/getHotKey",getHotKey);
//获取搜索数据
app.get("/api/getSearchResult/:id",getSearchResult)




app.listen(9527);