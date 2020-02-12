//歌词数据实时获取，不存入数据库
const request = require("request");
module.exports={
	getLyricData:function (req,res,err) {
		let body= JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
		request({
			url:"https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg",
			qs:{
				"-":"MusicJsonCallback_lrc",
				"pcachetime":1581490113069,
				"songmid": body.songMid,
				g_tk: 5381,
				loginUin: 0,
				hostUin: 0,
				format: "json",
				inCharset: "utf8",
				outCharset: "utf-8",
				notice: 0,
				platform: "yqq.json",
				needNewCode: 0
			},
			headers:{//当请求不到数据时，加上 header 试一试
				referer: "https://y.qq.com/portal/player.html"
				,origin: "https://y.qq.com"
			}
		},function (err,response,body) {
			//对数据进行解码 我们初始得到的歌词数据是一个 base64 先变成 buffer 再转成字符串
			res.send(new Buffer(JSON.parse(body).lyric,'base64').toString())
		})
	}
}
