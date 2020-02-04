//与前端传输数据接口
const express = require("express");
const {recommendTable} = require("./recommendTable")

let app = express();
app.get("/api/getRecommendData",function (req,res) {
    recommendTable.find({},{//返回这个表的所有数据
        __v:false
        ,_id:false
    }).then(data=>{
        res.send(JSON.stringify(data))
    }).catch(err=>{
        throw err;
    })

})
app.listen(9527)