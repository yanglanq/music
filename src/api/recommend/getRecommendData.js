//与前端传输数据接口
const express = require("express");
const { recommendTable } = require("./recommendTable");

let app = express();
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/ else next();
});

app.get("/api/getRecommendData", function(req, res) {
  recommendTable
    .find(
      {},
      {
        //返回这个表的所有数据
        __v: false,
        _id: false
      }
    )
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      throw err;
    });
});
app.listen(9527);
