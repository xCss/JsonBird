var express = require('express');
var request = require('request');
var router = express.Router();

router.all('/v1/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1');
    res.header("Vary", "Origin");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.get('/', function(req, res, next) {
    
    var protocol = req.protocol;
    var host = req.hostname;
    var ip = req.ip;
    var ref = req.get('reference');
    var originalUrl = req.originalUrl;

    if (originalUrl == /v1/) {
        ip2address(ip,function(data){
            var params = {
                code:200,
                ip:ip,
                info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
            };
            if(data){
                params['location']='来自'+data.area+data.location;
            }
            return res.send(params);
        });
        
    }else{
        var url = originalUrl.replace('/v1/?url=', '');
        url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
        console.log('------------------log start---------------');
        console.log('date:'+new Date());
        console.log('ip:' + ip);
        console.log('ref:' + ref);
        console.log('path:' + req.path);
        console.log('req:' + url);
        console.log('------------------log end---------------');
        getJSON(url, function(data) {
            if (req.query.callback) {
                return res.jsonp(data);
            } else {
                return res.send(data);
            }
        });
    }
});

function getJSON(url, callback, next) {
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback && callback(body);
        } else {
            console.log(err);
        }
    });
}

function ip2address(ip,callback){
    request('http://apis.juhe.cn/ip/ip2addr?ip='+ip+'&key=28c0a6a5eb9cca3f38bc5877a83c9868', function(err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(body['result']);
            callback && callback(body['result']);
        } else {
            console.log(' / request info:'+err);
            callback && callback(null);
        }
    });
}

module.exports = router;