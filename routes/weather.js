let express = require('express');
let request = require('superagent');
let qs = require('querystring');
let router = express.Router();
const base = 'http://op.juhe.cn/onebox/weather/query?key=e0540a109f5a73e9df2981cdeb9d106f';
router.get('/*', function(req, res, next) {
    getMobile(req, res, next);
});
router.post('/*', function(req, res, next) {
    getMobile(req, res, next);
});

function getMobile(req, res, next) {
    let city = req.query.city || req.body.city;
    city = !!city ? qs.escape(city) : '';
    let type = (req.query.type || req.body.type) === 'xml' ? 'xml' : '';
    let callback = req.query.callback || req.body.callback;
    let url = base + '&cityname=' + city + '&dtype=' + type;
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