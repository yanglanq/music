const  request = require("request");
const {JSDOM} = require("jsdom");
const {songTable} = require("./songTable")

module.exports = {
	getSongDetailData:function (req,res,err) {
		//获取歌曲 mid
		let body= JSON.parse(Object.keys(req.body)[0]);
		songTable.find({
			songMid:body.mid
		}).then((data)=>{//此时数据库中无数据
			if (Number(data) === 0) {
				request({
					method:"GET",
					url:"https://i.y.qq.com/v8/playsong.html",
					qs:{
						songmid:body.mid
					},
					headers:{
						"user-agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
					}
				},function (err,response,body) {
					let dom = new JSDOM(body,{runScripts:"dangerously"});
					let songData=dom.window.songlist[0];
					let finalData={
						songMid:songData.songmid,
						m4aUrl:songData.m4aUrl,//音频地址
						songName:songData.songname,
						playTime:songData.playTime,
						songPic:songData.pic//音频图片
					};
					console.log(finalData);
					songTable.create(
						finalData
					).then(()=>{
						console.log("添加成功")
					}).catch(err=>{
						console.log("添加失败")
						throw err;
					})
					res.send(finalData);
				});
			} else {
				res.send(data);
			}
		})
	}
}
