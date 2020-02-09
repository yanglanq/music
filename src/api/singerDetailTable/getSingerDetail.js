const  request = require("request");
const {JSDOM} = require("jsdom");
const {singerDetailTable} = require("./singerDetailTable");//表

module.exports = {
	getSingerDetailData:function (req, res, err) {
		// 这个 body 就是通过 axios 发送的数据
		let body = JSON.parse(Object.keys(req.body)[0]);
		singerDetailTable.find({
			singer_mid: body.mid //通过 mid 找到歌手
		}).then((data) => {
			if (Number(data) === 0) {//没有找到这个歌手数据
				request({
					method: "GET",
					url: "https://i.y.qq.com/n2/m/share/details/singer.html",
					qs: {
						"singermid": body.mid,
						"ADTAG": "newyqq.singer"
						,"source":"ydetail"
					}
				}, function (err, response, body) {//将 request 获取到的数据存入到数据库中
					let dom = new JSDOM(body, {runScripts: "dangerously"});
					let firstPageData = dom.window.firstPageData;
					let finalData = {};
					//基本的歌手信息
					finalData.singer_name = firstPageData.singerData.singer_name;//歌手名称
					finalData.singer_mid = firstPageData.singerData.singer_mid;//歌手mid
					finalData.singer_pmid = firstPageData.singerData.singer_pmid;//歌手mid
					finalData.singer_id = firstPageData.singerData.singer_id;//歌手id
					finalData.singerDesc = firstPageData.singerData.SingerDesc;//歌手简介

					finalData.songTotalNumber = firstPageData.singerData.total;//歌手歌曲总数

					finalData.fansTotalNumber = firstPageData.singerData.fans;//歌手粉丝总数
					//具体的歌曲信息
					finalData.songList = [];//预存 歌曲信息列表
					firstPageData.singerData.list.forEach((item) => {
						finalData.songList.push({
							songName: item.songInfo.name,
							songMid: item.songInfo.mid,
							songAlbum: item.songInfo.album.name
						})
					})
					res.send(finalData);//返回数据
					singerDetailTable.create(finalData).then(() => {
						console.log("数据库写入成功");
					}).catch(err=>{
						console.log("写入失败")
						throw err;
					})

				})
			} else {//数据库中存在这个歌手的信息
				res.send(data);
			}
		})
	}
}
