const {rankTable} = require("./rankTable")
module.exports = {
	getRankData:function (req,res) {
		rankTable.find({},{
			__v: false
			,_id:false
		}).then(data=>{
			res.send(data)
		})
	}
}