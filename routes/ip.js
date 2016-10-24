let express = require('express');
let request = require('superagent');
let router = express.Router();
const base = 'http://apis.juhe.cn/ip/ip2addr?key=28c0a6a5eb9cca3f38bc5877a83c9868';
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
    let ip = req.query.ip || req.body.ip || req.headers['x-real-ip'] || req.ip.replace(/\:\:1/, '127.0.0.1');
    let callback = req.query.callback || req.body.callback;
    let type = req.query.type || req.body.type;
    let url = base + '&ip=' + ip + '&dtype=' + type;
    let output = {
        data: {},
        status: {
            code: 200,
            message: ''
        }
    };
    request.get(url).end(function(err, response) {
        let body = response.body || response.text;
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