var express = require('express');
var request = require('request');
var qs = require('querystring');
var router = express.Router();
// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var key = "e0540a109f5a73e9df2981cdeb9d106f";
var base = 'http://op.juhe.cn/onebox/weather/query?key=' + key;
var type = '';
var callback = '';
var city = '';
router.get('/', function(req, res, next) {
    city = req.query.city;
    type = req.query.type === 'xml' ? 'xml' : '';
    callback = req.query.callback;
    getMobile(req, res, next);
});
router.post('/', urlencodedParser, function(req, res, next) {
    city = req.body.city;
    type = req.body.type === 'xml' ? 'xml' : '';
    getMobile(req, res, next);
});

function getMobile(req, res, next) {
    city = !!city ? qs.escape(city) : '';
    var url = type === 'xml' ? base + '&dtype=xml' : base;
    url += '&cityname=' + city;
    request(url, function(err, response, body) {
        if (!type) {
            body = JSON.parse(body);
            if (!err && response.statusCode === 200 && body.error_code === 0) {
                var output = {
                    data: body.result.data || body.result,
                    status: {
                        code: 200,
                        message: ''
                    }
                };
                if (callback) {
                    return res.jsonp(output);
                } else {
                    return res.json(output);
                }
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
        } else {
            res.header('content-type', 'text/xml');
            res.send(body);
        }
    });
}

module.exports = router;