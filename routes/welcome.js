var express = require('express');
var request = require('superagent');
var config = require('../configs/config').site;
var cookie = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36' };
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //var ip = req.ip;
    var ip = req.headers['x-real-ip'];
    ip2addr(ip, function(data) {
        var params = {
            head: config.title,
            title: 'Welcome | ' + config.title + ' - ' + config.description,
            description: config.description
        };
        if (data) {
            params['address'] = '欢迎来自' + data.area + data.location + '的朋友';
        }
        res.render('welcome', params);
    });

});

function ip2addr(ip, callback) {
    request
        .get('http://apis.juhe.cn/ip/ip2addr')
        .query({ ip: ip, key: '28c0a6a5eb9cca3f38bc5877a83c9868' })
        .set(cookie)
        .end(function(err, res) {
            var body = {};
            if (res && res.text) {
                body = res.text;
            } else if (res && res.body) {
                body = res.body;
            }
            if (!err && res.statusCode == 200) {
                if (typeof body === 'string') {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                callback && callback(body.result);
            } else {
                console.log(' / request info:' + err);
                callback && callback();
            }
        });
}


module.exports = router;