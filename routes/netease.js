var express = require('express');
var request = require('superagent');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8");
    //console.log('ref:' + req.header('referer'));
    var id = req.query.id;
    var playlist_id = req.query.playlist_id;
    var headers = {};
    headers['Cookie'] = 'appver=1.5.0.75771;';
    headers['referer'] = 'http://music.163.com';
    headers['User-Agent'] = req.headers['user-agent'];

    var url = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';
    if (playlist_id) {
        url = 'http://music.163.com/api/playlist/detail/?id=' + playlist_id;
    }
    netease_http(headers, url, next, function(data) {
        res.send(data)
            // var output = {
            //     data: data,
            //     status: {
            //         code: 200,
            //         message: ''
            //     }
            // };
            // if (req.query.callback) {
            //     return res.jsonp(output)
            // } else {
            //     return res.send(output);
            // }
    });
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