var express = require('express');
var request = require('request');
var router = express.Router();

// router.all('*', function(req, res, next) {
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

router.get('/*', function(req, res, next) {
    var host = req.hostname;
    var protocol = req.protocol;
    var originalUrl = req.originalUrl;
    var ip = req.ip.replace(/\:\:ffff\:/, '');
    var ip = req.ip.replace(/\:\:1/, '127.0.0.1');
    if (!req.query.url) {
        ip2address(ip, function(data) {
            var output = {
                data: {
                    IP: ip,
                    Info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
                },
                status: {
                    code: 200,
                    message: ''
                }
            };
            if (data) {
                output['data']['Location'] = data.area + data.location;
            }
            return res.json(output);
        });
    } else {
        var url = originalUrl.split('url=')[1];
        url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
        url = /^(http|https)\:\/\//.test(url) ? url : 'http://' + url;
        getJSON(url, next, function(data) {
            var output = {
                data: data,
                status: {
                    code: 200,
                    message: ''
                }
            };
            if (req.query.callback) {
                return res.jsonp(output);
            } else {
                return res.json(output);
            }
        });
    }
});

router.post('/*', function(req, res, next) {
    res.json(req.body);
});

function getJSON(url, next, callback) {
    request(url, function(err, res, body) {
        body = JSON.parse(body);
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            var error = {
                data: {},
                status: {
                    code: -1,
                    message: body.reason
                }
            };
            res.json(error);
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