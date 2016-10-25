var express = require('express');
var request = require('superagent');
var router = express.Router();
var base = 'http://apis.juhe.cn/ip/ip2addr?key=28c0a6a5eb9cca3f38bc5877a83c9868';
router.get('/*', function(req, res, next) {
    ip2address(req, res, next);
});
router.post('/*', function(req, res, next) {
    ip2address(req, res, next);
});
/**
 * 获取IP地址所对应的地区
 */
function ip2address(req, res, next) {
    var ip = req.query.ip || req.body.ip || req.headers['x-real-ip'] || req.ip.replace(/\:\:1/, '127.0.0.1');
    var callback = req.query.callback || req.body.callback;
    var type = req.query.type || req.body.type;
    var url = base + '&ip=' + ip + '&dtype=' + type;
    var output = {
        data: {},
        status: {
            code: 200,
            message: ''
        }
    };
    request.get(url).end(function(err, response) {
        var body = response.text || response.body || {};
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
            output.data['ip'] = ip;
            if (!err && response.statusCode === 200) {
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
            res.header('content-type', 'text/xml;charset=utf-8');
            return res.send(body);
        }

    });
}


module.exports = router;