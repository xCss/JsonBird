var express = require('express');
var request = require('request');
var router = express.Router();
var disabledIP = require('../utils/disabledIP').list;
var cookie = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36' };


router.get('/*', function(req, res, next) {
    // let link = req.query.url || '';
    // let cb = req.query.cb || '';
    // getJSON(req, res, next);
    convert(req, res, next)
});

router.post('/*', function(req, res, next) {
    // getJSON(req, res, next);
    convert(req, res, next)
});

const convert = (req, res, next) => {
    let method = req.method.toUpperCase();
    let link = req.query.url || req.body.url;
    let cb = req.query.callback || req.body.callback;
    let params = req.body;
    let config = {
        method: method,
        uri: link,
        json: params,
        headers: req.headers
    }

    var options = {
        uri: 'https://www.googleapis.com/urlshortener/v1/url',
        method: 'get',
        json: { "longUrl": "http://www.google.com/" }
    };
    createServer(options).then(ret => {
        console.log(ret)
    }).catch(ex => {
        console.log(ex)
    })

    // switch(method){
    //     case 'GET':
    //         let originalUrl = req.originalUrl;
    //         originalUrl = originalUrl.replace(/\/v1\?/,'').replace('?','&');

    //         break;
    // }
    // if (link) {
    //     let
    //     switch (method) {
    //         case 'GET':
    //             link +=
    //     }

    // }
    //console.log(req.headers)

}

const createServer = (config) => {
    return new Promise((resolve, reject) => {
        request(config, (err, ret, body) => {
            if (!err && ret.statusCode === 200) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}

function getJSON(req, res, next) {
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
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
            message: ''
        }
    };
    if (disabledIP.indexOf(ip) > -1) {

        output['data']['info'] = '很抱歉，您的IP因为滥用接口已被禁用，如有疑问，请致信 xioveliu@gmail.com ';
        output['status'] = -1;
        output['message'] = 'DISABLED IP';
        res.json(output);

    } else {

        method = req.method.toUpperCase();
        var _cookies = req.cookies;
        var headers = { 'user-agent': req.headers['user-agent'] };
        //console.log(headers);
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
                        .set(headers)
                        .set(_cookies)
                        .query(_temp)
                        .end(function(err, response) {
                            var body = {};
                            if (response && response.text) {
                                body = response.text;
                            } else if (response && response.body) {
                                body = response.body;
                            }
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
                        .set(headers)
                        .set(_cookies)
                        .type('form')
                        .send(_temp)
                        .end(function(err, response) {
                            var body = {};
                            if (response && response.text) {
                                body = response.text;
                            } else if (response && response.body) {
                                body = response.body;
                            }
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

}



module.exports = router;