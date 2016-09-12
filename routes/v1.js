var express = require('express');
var request = require('request');
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/', function(req, res, next) {
    var host = req.hostname;
    var protocol = req.protocol;
    var originalUrl = req.originalUrl;
    var ip = req.ip;
    if (originalUrl == /v1/) {
        ip2address(ip, function(data) {
            var params = {
                code: 200,
                ip: ip,
                info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
            };
            if (data) {
                params['location'] = data.area + data.location;
            }
            return res.send(params);
        });

    } else {
        var url = originalUrl.replace('/v1/?url=', '');
        url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
        url = url.indexOf('http://') === -1 ? 'http://' + url : url;
        getJSON(url, function(data) {
            if (req.query.callback) {
                return res.jsonp(data);
            } else {
                return res.send(data);
            }
        });
    }
});

function getJSON(url, callback, next) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            console.log(err);
        }
    });
}

function ip2address(ip, callback) {
    request('http://apis.juhe.cn/ip/ip2addr?ip=' + ip + '&key=28c0a6a5eb9cca3f38bc5877a83c9868', function(err, res, body) {
        body = JSON.parse(body);
        if (!err && res.statusCode == 200 && body['error_code'] !== 200102) {
            callback && callback(body['result']);
        } else {
            console.log(' / request info:' + err);
            callback && callback();
        }
    });
}

module.exports = router;