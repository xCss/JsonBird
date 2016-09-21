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
    var url = "http://japi.juhe.cn/joke/img/text.from?key=" + key + "&page=" + page + "&pagesize=" + pagesize;
    if (!!sort && !!time) {
        url = "http://japi.juhe.cn/joke/img/list.from?key=" + key + "&page=" + page + "&pagesize=" + pagesize + "&sort=" + sort + "&time=" + time;
    }
    getJOKE(req, res, next, url);
});

/**
 * Post 请求
 */
router.post('/', urlencodedParser, function(req, res, next) {
    var params = {
        page: req.body.page || 1,
        pagesize: req.body.pagesize || 1,
        sort:req.body.sort || '',
        time:req.body.time || '' 
    };
});

function getJOKE(req, res, next, url) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            var output = {
                data: body,
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
            var error = new Error(err);
            error.status = 404;
            next(error);
        }
    });
}



module.exports = router;