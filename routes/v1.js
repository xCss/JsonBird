var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/*', function(req, res, next) {
    var host = req.hostname;
    var protocol = req.protocol;
    var originalUrl = req.originalUrl;
    var ip = req.ip.replace(/\:\:ffff\:/, '');
    var ip = req.ip.replace(/\:\:1/, '127.0.0.1');
    if (!req.query.url) {
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
        console.log(err);
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            var error = {
                data: body,
                status: {
                    code: -1,
                    message: err || body.reason || 'Something bad happened.'
                }
            };
            next(error);
        }
    });
}



module.exports = router;