const request = require("request");
const {JSDOM} = require("jsdom");
const {recommendDetailTable} = require("./detailTable");

module.exports = {
    getRecommendDetailData: function (req, res) {
        recommendDetailTable
        .find({
            id: req.params.id
        })
        .then(data => {
            if (!data.length) {
                //没查找到 将request获得的数据存入到数据库中
                request(
                    {
                        method: "GET",
                        url: `https://i.y.qq.com/n2/m/share/details/taoge.html`,
                        qs: {
                            ADTAG: "newyqq.taoge",
                            id: req.params.id //歌单 id
                            //通过歌单 id 获取歌单详细信息
                        }
                    },
                    function (err, response, body) {
                        //这个数据是嵌入在 html 中的 script 标签里面，我们要通过 jsdom 将js代码激活
                        let dom = new JSDOM(body, {runScripts: "dangerously"});
                        let songList = dom.window.firstPageData; //返回对象

                        let finalData = {};
                        finalData.id = songList.taogeData.id; //歌单 id
                        finalData.cover = songList.taogeData.picurl; //歌单封面
                        finalData.title = songList.taogeData.title; //歌单名称
                        //finalData.tag = [];//歌单标签
                        finalData.songList = []; //歌单歌曲列表
                        finalData.tag = songList.taogeData.tag;
                        console.log(songList.taogeData.songlist[0],songList.taogeData.songlist[0].singer)
                        songList.taogeData.songlist.forEach(item => {
                            finalData.songList.push({
                                singerName: item.singername,
                                songMid: item.mid,
                                songName: item.name,
                                songAlbum:songList.taogeData.title
                            });
                        });
                        recommendDetailTable
                            .create(finalData)
                            .then(() => {
                                console.log("存储成功");
                            })
                            .catch(err => {
                                throw err;
                            });
                        res.send(JSON.stringify(finalData));
                    }
                );
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            throw err;
        });
    }
}



