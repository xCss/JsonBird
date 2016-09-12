var express = require('express');
var request = require('request');
var config = require('../configs/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var ip = req.ip;
    ip2addr(ip, function(data) {
        var params = {
            title: 'Welcome | ' + config.welcome
        };
        if (data) {
            params['address'] = '欢迎来自' + data.area + data.location + '的朋友';
        }
        res.render('welcome', params);
    });

});

function ip2addr(ip, callback) {
    request('http://apis.juhe.cn/ip/ip2addr?ip=' + ip + '&key=28c0a6a5eb9cca3f38bc5877a83c9868', function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            callback && callback(body.result);
        } else {
            console.log(' / request info:' + err);
            callback && callback();
        }
    });
}


module.exports = router;