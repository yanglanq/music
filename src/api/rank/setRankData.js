const request = require("request");
const {rankTable} = require("./rankTable");

request(
	{
		url:"https://u.y.qq.com/cgi-bin/musicu.fcg",
		qs:{
			_:1581595631957,
			data:`{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
		}
	},
	function (err,response,body) {
		let data = JSON.parse(body);//将 json 转为对象
		let finalData = [];
		data.topList.data.group.forEach((item)=>{
			item.toplist.forEach((list)=>{
				let listData = {};
				listData.picUrl=list.headPicUrl;
				listData.intro=list.intro;
				listData.title=list.title;
				listData.topId=list.topId;
				listData.songlist=[];
				list.song.forEach((songItem)=>{
					listData.songlist.push({
						songName:songItem.title,
						albumMid:songItem.albumMid,
						singerName:songItem.singerName,
						singerMid: songItem.singerMid
					})
				});
				finalData.push(listData);
			})
		});
		// console.log(finalData)
		rankTable.create(
			finalData
		).then(()=>{
			console.log("添加成功")
		})
	}
);
