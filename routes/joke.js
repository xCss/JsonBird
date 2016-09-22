var express = require('express');
var request = require('request');
var router = express.Router();
// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var params = {
    key: '64a40e3c55e88cc8cd66a78d030bddce',
    method: 'get',
    page: 1,
    pagesize: 1,
    sort: '',
    time: '',
    type: ''
};

/**
 * Get 请求
 */
router.get('/', function(req, res, next) {
    params.method = 'get';
    params.page = req.query.page || 1;
    params.pagesize = req.query.pagesize || 1;
    params.sort = req.query.sort || '';
    params.time = req.query.time || '';
    params.type = req.query.type;
    getJOKE(req, res, next);
});
/**
 * 随机获取
 */
router.get('/rand', function(req, res, next) {
    params.method = 'get';
    params.type = req.query.type || 'pic';
    getJOKE(req, res, next, 'rand');
});

/**
 * Post 请求
 */
router.post('/', urlencodedParser, function(req, res, next) {
    params.method = 'post';
    params.page = req.body.page || 1;
    params.pagesize = req.body.pagesize || 1;
    params.sort = req.body.sort || '';
    params.time = req.body.time || '';
    params.type = req.body.type;
    getJOKE(req, res, next);
});
/**
 * 随机获取 
 */
router.post('/rand', urlencodedParser, function(req, res, next) {
    params.method = 'post';
    params.type = req.body.type || 'pic';
    getJOKE(req, res, next, 'rand');
});

/**
 * 统一的请求
 */
function getJOKE(req, res, next, op) {
    var url = '';
    if (!!op && op === 'rand') {
        if (params.type !== 'pic') {
            params.type = null;
        }
        url = "http://v.juhe.cn/joke/randJoke.php?key=" + params.key;
        if (!!params.type) {
            url += "&type=" + params.type;
        }
    } else {
        url = "http://japi.juhe.cn/joke/";
        if (!!params.type && params.type === 'text') {
            url += "content/text.from?key=";
        } else {
            url += "img/text.from?key=";
        }
        url += params.key + "&page=" + params.page + "&pagesize=" + params.pagesize;
        if (!!params.sort && !!params.time) {
            url += "&sort=" + params.sort + "&time=" + params.time;
            url = url.replace(/text/, 'list');
        }
    }
    request(url, function(err, response, body) {
        body = JSON.parse(body);
        if (!err && response.statusCode === 200 && body.error_code === 0) {
            var output = {
                data: body.result.data || body.result,
                status: {
                    code: 200,
                    message: ''
                }
            };
            if (req.query.callback) {
                return res.jsonp(output);
            } else {
                return res.json(output);
            }
        } else {
            var error = new Error(body.reason);
            error.status = -1;
            next(error);
        }
    });
}



module.exports = router;