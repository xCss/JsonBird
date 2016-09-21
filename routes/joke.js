var express = require('express');
var request = require('request');
var router = express.Router();
// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var key = "64a40e3c55e88cc8cd66a78d030bddce";
/**
 * Get 请求
 */
router.get('/', function(req, res, next) {
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize || 1;
    var sort = req.query.sort || '';
    var time = req.query.time || '';
    var type = req.query.type;
    var url = "http://japi.juhe.cn/joke/";
    if (!!type && type === 'text') {
        url += "content/text.from?key=";
    } else {
        url += "img/text.from?key=";
    }
    url += key + "&page=" + page + "&pagesize=" + pagesize;
    if (!!sort && !!time) {
        url += "&sort=" + sort + "&time=" + time;
        url = url.replace(/text/, 'list');
    }
    if (!!sort && !!time) {
        url += "&sort=" + sort + "&time=" + time;
    }

    getJOKE(req, res, next, url);
});
/**
 * 随机获取
 */
router.get('/rand', function(req, res, next) {
    var type = req.query.type || 'pic';
    if (type !== 'pic')
        type = null;
    var url = "http://v.juhe.cn/joke/randJoke.php?key=" + key;
    if (!!type) {
        url += "&type=" + type;
    }
    getJOKE(req, res, next, url);
});

/**
 * Post 请求
 */
router.post('/', urlencodedParser, function(req, res, next) {
    var page = req.body.page || 1;
    var pagesize = req.body.pagesize || 1;
    var sort = req.body.sort || '';
    var time = req.body.time || '';
    var type = req.body.type;
    var url = "http://japi.juhe.cn/joke/";
    if (!!type && type === 'text') {
        url += "content/text.from?key=";
    } else {
        url += "img/text.from?key=";
    }
    url += key + "&page=" + page + "&pagesize=" + pagesize;
    if (!!sort && !!time) {
        url += "&sort=" + sort + "&time=" + time;
        url = url.replace(/text/, 'list');
    }
    getJOKE(req, res, next, url);
});
/**
 * 随机获取 
 */
router.post('/rand', urlencodedParser, function(req, res, next) {
    var type = req.body.type || 'pic';
    if (type !== 'pic') {
        type = null;
    }
    var url = "http://v.juhe.cn/joke/randJoke.php?key=" + key;
    if (!!type) {
        url += "&type=" + type;
    }
    getJOKE(req, res, next, url);
});

function getJOKE(req, res, next, url) {
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
                return res.send(output);
            }
        } else {
            var error = new Error(body.reason);
            error.status = 404;
            next(error);
        }
    });
}



module.exports = router;