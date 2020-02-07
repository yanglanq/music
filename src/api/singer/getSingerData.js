const {singerTable} = require("./singerTable");

module.exports = {
    getSingerData:function (req,res) {
        singerTable.find({},{
            _id:false
            ,__v:false
        }).then(data=>{
            res.send(data)
        }).catch(err=>{
            throw err;
        })
    }
}