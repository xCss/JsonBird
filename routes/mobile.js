var express = require('express');
var request = require('request');
var router = express.Router();
// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var key = "9f719ab7014f2cbdc7b394edf70d0f76";
var base = 'http://apis.juhe.cn/mobile/get?key=' + key;
var type = '';
var callback = '';
var phone = '';
router.get('/', function(req, res, next) {
    phone = req.query.phone;
    type = req.query.type === 'xml' ? 'xml' : '';
    callback = req.query.callback;
    getMobile(req, res, next);
});
router.post('/', urlencodedParser, function(req, res, next) {
    phone = req.body.phone;
    type = req.body.type === 'xml' ? 'xml' : '';
    callback = req.body.callback;
    getMobile(req, res, next);
});

function getMobile(req, res, next) {
    var url = !!type ? base + '&dtype=' + type : base;
    url += '&phone=' + phone;
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