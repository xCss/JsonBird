let express = require('express');
let request = require('request');
let config = require('../configs/config').site;
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //let ip = req.ip;
    let ip = req.headers['x-real-ip'];
    ip2addr(ip, function(data) {
        let params = {
            head: config.title,
            title: 'Welcome | ' + config.title + ' - ' + config.description,
            description: config.description
        };
        if (data) {
            params['address'] = '欢迎来自' + data.area + data.location + '的朋友';
        }
        res.render('welcome', params);
    });

});

function ip2addr(ip, callback) {
    request('http://apis.juhe.cn/ip/ip2addr?ip=' + ip + '&key=28c0a6a5eb9cca3f38bc5877a83c9868', function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            callback && callback(body.result);
        } else {
            console.log(' / request info:' + err);
            callback && callback();
        }
    });
}


module.exports = router;