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
    var host = req.host;
    var ip = req.ip;

    if (req.originalUrl == /v1/) {
        return res.send({
            info: 'Please Set URL Like This: ' + protocol + '://' + host + '/v1/?url=http[s]://YourWantProxyUrl.com'
        });
    }
    var url = req.originalUrl.replace('/v1/?url=', '');
    url = url.indexOf('?') === -1 ? url.replace('&', '?') : url;
    console.log('ref:' + req.get('reference'));
    console.log('path:' + req.path);
    console.log(req.subdomains);
    console.log(url);
    getJSON(url, function(data) {
        if (req.query.callback) {
            return res.jsonp(data);
        } else {
            return res.json(data);
        }
    });
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

module.exports = router;