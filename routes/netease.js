var express = require('express');
var request = require('superagent');
var router = express.Router();

const util = require('../utils/utils')

const links = {
    song: '/weapi/v3/song/detail',
    song_url: '/weapi/song/enhance/player/url',
    playlist: '/weapi/v3/playlist/detail'
}

/* GET users listing. */
router.get('/:channel', function(req, res, next) {
    const id = req.query.id
    const br = req.query.br || 999000
    const channel = req.params['channel']
    let config = {
        path: links[channel],
        params: {
            "ids": [id],
            "br": 999000,
            "csrf_token": ""
        }
    }
    switch (channel) {
        case 'playlist':
            config['params'] = {
                "id": id,
                "offset": 0,
                "total": true,
                "limit": 1000,
                "n": 1000,
                "csrf_token": ""
            }
            break;
        case 'song':
            config['params'] = {
                'c': JSON.stringify([{ id: id }]),
                "ids": '[' + id + ']',
                "csrf_token": ""
            }
            break;
        default:
            res.send({
                data: {},
                status: {
                    code: -1,
                    msg: 'no support url. Please set `song` or `playlist`'
                }
            })
            break;
    }
    util.requestServer(config).then(ret => {
        if (channel == 'song') {
            config['path'] = links.song_url
            config['params'] = {
                "ids": [id],
                "br": br,
                "csrf_token": ""
            }
            util.requestServer(config).then(rt => {
                let song = ret.songs[0]
                song['mp3'] = rt.data[0]
                res.send({
                    data: song,
                    status: {
                        code: 200,
                        msg: ''
                    }
                })
            }).catch(ex => {
                res.send({
                    data: {},
                    status: {
                        code: -1,
                        msg: 'something happend. Please checked your id or url'
                    }
                })
            })
        } else {
            res.send(ret)
        }
    }).catch(err => {
        res.send({
            data: {},
            status: {
                code: -1,
                msg: 'something happend. Please checked your id or url'
            }
        })
    })

    // res.header("Content-Type", "application/json;charset=utf-8");
    // //console.log('ref:' + req.header('referer'));
    // var id = req.query.id;
    // var playlist_id = req.query.playlist_id;
    // var headers = {};
    // headers['Cookie'] = 'appver=1.5.0.75771;';
    // headers['referer'] = 'http://music.163.com';
    // headers['User-Agent'] = req.headers['user-agent'];

    // var url = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';
    // if (playlist_id) {
    //     url = 'http://music.163.com/api/playlist/detail/?id=' + playlist_id;
    // }
    // netease_http(headers, url, next, function(data) {
    //     var songs = data.songs;
    //     songs.map(function(item) {
    //         var url = item['mp3Url'];
    //         item['sslUrl'] = url.replace('http://m', 'https://p');
    //         return item;
    //     });
    //     data.songs = songs;
    //     res.send(data)
    //         // var output = {
    //         //     data: data,
    //         //     status: {
    //         //         code: 200,
    //         //         message: ''
    //         //     }
    //         // };
    //         // if (req.query.callback) {
    //         //     return res.jsonp(output)
    //         // } else {
    //         //     return res.send(output);
    //         // }
    // });
});

function netease_http(headers, url, next, callback) {
    request.get(url).set(headers).end(function(err, res) {
        var body = {};
        if (res && res.text) {
            body = res.text;
        } else if (res && res.body) {
            body = res.body;
        }
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {}
        }
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            var error = new Error(err);
            error.status = 404;
            next(error);
        }
    });
}

module.exports = router;