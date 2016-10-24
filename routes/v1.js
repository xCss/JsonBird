var express = require('express');
var request = require('superagent');
var router = express.Router();

router.get('/*', function(req, res, next) {
    getJSON(req, res, next, 'get');
});

router.post('/*', function(req, res, next) {
    getJSON(req, res, next, 'post');
});

function getJSON(req, res, next, method) {
    let ip = req.ip.replace(/\:\:ffff\:/, '').replace(/\:\:1/, '127.0.0.1');
    let host = req.hostname;
    let protocol = req.protocol;
    let originalUrl = req.originalUrl;
    let url = req.query.url || req.body.url;
    let callback = req.query.callback || req.body.callback;
    let params = req.body;
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
    method = method.toUpperCase();
    if (url) {
        let _temp = {};
        switch (method) {
            case 'GET':
                // get request
                if (/\?url\=/.test(originalUrl)) {
                    url = originalUrl.split('url=')[1];
                }

                if (params) {
                    for (let i in params) {
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
                        let body = response.body || response.text;
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
                    for (let i in params) {
                        _temp[i] = params[i];
                    }
                }
                request
                    .post(url)
                    .type('form')
                    .send(_temp)
                    .end(function(err, response) {
                        let body = response.body || response.text;
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