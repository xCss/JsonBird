var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8");
    //console.log('ref:' + req.header('referer'));
    var id = req.query.id;
    var playlist_id = req.query.playlist_id;

    var url = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';
    if (playlist_id) {
        url = 'http://music.163.com/api/playlist/detail/?id=' + playlist_id;
    }
    netease_http(url, nex, function(data) {
        return res.send(data);
    });
});

function netease_http(url, next, callbackt) {
    var options = {
        url: url,
        headers: {
            Cookie: 'appver=1.5.0.75771;',
            referer: 'http://music.163.com'
        }
    };
    request(options, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            callback && callback(body);
        } else {
            var error = new Error(err);
            error.status = 404;
            next(error);
        }
    });
}

module.exports = router;