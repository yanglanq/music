//与前端传输数据接口
const { recommendTable } = require("./recommendTable");

//将这个函数导出
module.exports = {
    getRecommendData:function (req,res) {
        recommendTable.find({},{
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
    }
}

