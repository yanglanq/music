const request = require("request");
const {singerTable} = require("./singerTable");
request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs: {
        _: "getUCGI3487831168844191",
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: `{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}`
    }
},function (err, res, body) {
    let singerList = JSON.parse(body).singerList.data.singerlist;
    console.log(singerList)
    singerList.forEach((item) => {
        singerTable.create({
            "singer_id": item.singer_id, // 歌手的id
            "singer_mid": item.singer_mid,//方便后期获取歌手的详细信息
            "singer_name": item.singer_name,
            "singer_pic": item.singer_pic,
        }).then(()=>{
            console.log("添加成功");
        }).catch(err=>{
            console.log("添加失败")
        })
    })
})