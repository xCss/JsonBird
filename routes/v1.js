var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/*', function(req, res, next) {
    getJSON(req, res, next);
    // var host = req.hostname;
    // var protocol = req.protocol;
    // var originalUrl = req.originalUrl;
    // var ip = req.ip.replace(/\:\:ffff\:/, '');
    // ip = ip.replace(/\:\:1/, '127.0.0.1');
    // if (!req.query.url) {
    //     var output = {
    //         data: {
    //             IP: ip,
    //             Info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
    //         },
    //         status: {
    //             code: 200,
    //             message: ''
    //         }
    //     };
    //     return res.json(output);
    // } else {
    //     var url = originalUrl.split('url=')[1];
    //     url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
    //     url = /^(http|https)\:\/\//.test(url) ? url : 'http://' + url;
    //     getJSON(url, next, function(data) {
    //         var output = {
    //             data: data,
    //             status: {
    //                 code: 200,
    //                 message: ''
    //             }
    //         };
    //         if (req.query.callback) {
    //             return res.jsonp(output);
    //         } else {
    //             return res.json(output);
    //         }
    //     });
    // }
});

router.post('/*', function(req, res, next) {
    //res.json(req.body);
    getJSON(req, res, next);
});

function getJSON(req, res, next) {
    let ip = req.ip.replace(/\:\:ffff\:/, '').replace(/\:\:1/, '127.0.0.1');
    let host = req.hostname;
    let protocol = req.protocol;
    let originalUrl = req.originalUrl;
    let url = req.query.url || req.body.url;
    let callback = req.query.callback || req.body.callback;
    let output = {
        data: {
            IP: ip,
            Info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.Com'
        },
        status: {
            code: 200,
            massage: ''
        }
    };
    if (url) {
        if (/\?url\=/.test(originalUrl)) {
            url = originalUrl.split('url=')[1];
        }
        url = url.indexOf('?') === -1 ? url.replace(/\&/, '?') : url;
        url = /^(http|https)\:\/\//.test(url) ? url : 'http://' + url;
        url = url.replace(/\&callback\=(\w+)/, '');
        request(url, function(err, response, body) {
            try {
                body = JSON.parse(body);
            } catch (e) {
                output.status = {
                    code: -1
                };
            }
            if (!err && response.statusCode == 200) {
                output.data = body;
            } else {
                output = {
                    data: {},
                    status: {
                        code: -1,
                        message: err || 'Something bad happend.'
                    }
                };
            }
            if (callback) {
                res.jsonp(output);
            } else {
                res.json(output);
            }
        });
    } else {
        if (callback) {
            res.jsonp(output);
        } else {
            res.json(output);
        }
    }

}



module.exports = router;