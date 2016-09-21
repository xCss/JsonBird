var express = require('express');
var request = require('request');
var router = express.Router();
var key = "64a40e3c55e88cc8cd66a78d030bddce";
router.get('/', function(req, res, next) {
    var page = req.query.page || 1;
    var pagesize = req.query.pagesize || 1;
    var url = "http://japi.juhe.cn/joke/img/text.from?key=" + key + "&page=" + page + "&pagesize=" + pagesize;
    getJOKE(url, next, function(data) {
        var output = {
            data: data,
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
    });
});

function getJOKE(url, next, callback) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            callback && callback(body);
        } else {
            var error = new Error(err);
            error.status = 404;
            next(error);
        }
    });
}



module.exports = router;