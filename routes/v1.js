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
            var output = {
                status: 200,
                IP: ip,
                info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
            };
            if (data) {
                output['Location'] = data.area + data.location;
            }
            return res.send(output);
        });

    } else {
        var url = originalUrl.replace('/v1/?url=', '');
        url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
        url = url.indexOf('http://') === -1 ? 'http://' + url : url;
        getJSON(url, next, function(data) {
            if (req.query.callback) {
                return res.jsonp(data);
            } else {
                return res.send(data);
            }
        });
    }
});

function getJSON(url, next, callback) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            var error = new Error(err);
            error.status = 404;
            next(error);
        }
    });
}

/**
 * 获取IP地址所对应的地区
 */
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