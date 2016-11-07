var express = require('express');
var request = require('superagent');
var router = express.Router();
var base = 'http://op.juhe.cn/onebox/weather/query?key=e0540a109f5a73e9df2981cdeb9d106f';
var cookie = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36' };
router.get('/*', function(req, res, next) {
    getMobile(req, res, next);
});
router.post('/*', function(req, res, next) {
    getMobile(req, res, next);
});

function getMobile(req, res, next) {
    var city = req.query.city || req.body.city;
    city = !!city ? encodeURIComponent(city) : '';
    var type = (req.query.type || req.body.type) === 'xml' ? 'xml' : '';
    var callback = req.query.callback || req.body.callback;
    var url = base + '&cityname=' + city + '&dtype=' + type;
    var output = {
        data: {},
        status: {
            code: 200,
            message: ''
        }
    };
    request.get(url).set(cookie).end(function(err, response) {
        var body = {};
        if (response && response.text) {
            body = response.text;
        } else if (response && response.body) {
            body = response.body;
        }
        if (type !== 'xml') {
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    output.status = {
                        code: -1
                    };
                }
            }
            output.data = (body.result && body.result.data ? body.result.data : body.result) || {};
            if (!err && response.statusCode === 200 && body.error_code === 0) {
                //
            } else {
                output.status = {
                    code: -1,
                    message: err || body.reason || 'Something bad happend.'
                };
            }
            if (callback) {
                return res.jsonp(output);
            } else {
                return res.json(output);
            }
        } else {
            res.header('content-type', 'text/xml; charset=utf-8');
            return res.send(body);
        }
    });
}

module.exports = router;