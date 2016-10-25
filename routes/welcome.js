var express = require('express');
var request = require('superagent');
var config = require('../configs/config').site;
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
        .end(function(err, res) {
            console.log(res)
            var body = res.text || res.body || {};
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