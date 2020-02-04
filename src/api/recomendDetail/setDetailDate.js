const request  = require("request");
const {JSDOM} = require("jsdom");
const fs = require("fs");

request({
    method:"GET"
    ,url:`https://i.y.qq.com/n2/m/share/details/taoge.html?ADTAG=newyqq.taoge&id=7256912512`
},function (err,res,body) {
    //这个数据是嵌入在 html 中的 script 标签里面，我们要通过 jsdom 将js代码激活
    let dom = new JSDOM(body,{runScripts:"dangerously"});
    let songList = JSON.stringify(dom.window.firstPageData)
    fs.writeFile(`${__dirname}/demo.json`,songList,{
        encoding:"utf8"
    },function (err) {
        if(err) throw err;
        console.log("写入成功")
    })
})
