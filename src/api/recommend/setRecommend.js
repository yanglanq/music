const request = require("request");
const mongoose = require("mongoose");
const  fs = require("fs");
const path = require("path");
const {recommendTable} = require("./recommendTable")

request({
    method:"GET"
    ,url:"https://u.y.qq.com/cgi-bin/musicu.fcg"
    ,qs:{
        cgiKey: "GetHomePage"
        ,_: 1580788419288
        ,data:`{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }
},async(err,res,body)=>{
    //把 body 写入 只执行一遍
    // fs.writeFile(`${__dirname}/demo.json`,body,{
    //     encoding:"utf8"
    // },(err)=>{
    //     if(err) throw err;
    //     console.log("写入成功")
    // })

    //把获取的数据存入到 mongoose 存入到数据库中
    await recommendTable.deleteMany({});
    //获取所有的推荐分区信息
    let data = JSON.parse(body).MusicHallHomePage.data.v_shelf;
    data.forEach((item)=>{
        let category = item.title_template;//分区名称
        let categorylist = item.v_niche[0].v_card//里面的详细歌单列表
        let arr = [];
        categorylist.forEach((list)=>{
            if(!list.time){
                arr.push({
                    id:list.id
                    ,title:list.title
                    ,cover:list.cover
                    ,cnt:list.cnt
                })
            }
        })
        if(arr.length){
            recommendTable.create({
                category:category
                ,categoryList:arr
            }).then(()=>{
                console.log("写入成功");
            }).catch(err=>{
                console.log("写入失败")
                throw err;
            })
        }
    })
})