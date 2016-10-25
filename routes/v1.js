var express = require('express');
var request = require('superagent');
var router = express.Router();

router.get('/*', function(req, res, next) {
    getJSON(req, res, next);
});

router.post('/*', function(req, res, next) {
    getJSON(req, res, next);
});

function getJSON(req, res, next) {
    var ip = req.ip.replace(/\:\:ffff\:/, '').replace(/\:\:1/, '127.0.0.1');
    var host = req.hostname;
    var protocol = req.protocol;
    var originalUrl = req.originalUrl;
    var url = req.query.url || req.body.url;
    var callback = req.query.callback || req.body.callback;
    var params = req.body;
    var output = {
        data: {
            IP: ip,
            Info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.Com'
        },
        status: {
            code: 200,
            massage: ''
        }
    };
    method = req.method.toUpperCase();
    if (url) {
        var _temp = {};
        switch (method) {
            case 'GET':
                // get request
                if (/\?url\=/.test(originalUrl)) {
                    url = originalUrl.split('url=')[1];
                }

                if (params) {
                    for (var i in params) {
                        _temp[i] = encodeURI(params[i]);
                    }
                }
                url = url.indexOf('?') === -1 ? url.replace(/\&/, '?') : url;
                url = /^(http|https)\:\/\//.test(url) ? url : 'http://' + url;
                url = url.replace(/\&callback\=(\w+)/, '');
                request
                    .get(url)
                    .query(_temp)
                    .end(function(err, response) {
                        var body = response.text || response.body || {};
                        if (typeof body === 'string') {
                            try {
                                body = JSON.parse(body);
                            } catch (e) {
                                output.status = {
                                    code: -1
                                };
                            }
                        }
                        if (!err && response.statusCode == 200) {
                            output = body;
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
                break;
            default:
                // post request
                if (params) {
                    for (var i in params) {
                        _temp[i] = params[i];
                    }
                }
                request
                    .post(url)
                    .type('form')
                    .send(_temp)
                    .end(function(err, response) {
                        var body = response.text || response.body || {};
                        if (typeof body === 'string') {
                            try {
                                body = JSON.parse(body);
                            } catch (e) {
                                output.status = {
                                    code: -1
                                };
                            }
                        }
                        if (!err && response.statusCode == 200) {
                            output = body;
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
                break;
        }
    } else {
        if (callback) {
            res.jsonp(output);
        } else {
            res.json(output);
        }
    }

}



module.exports = router;