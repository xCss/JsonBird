var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");  
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.header("X-Powered-By",'3.2.1');
    // res.header("Vary","Origin");
    // res.header("Content-Type", "application/json;charset=utf-8");  
    // var protocol = req.protocol;
    // var host = req.host;
    // var ip = req.ip;
    // return res.send({
    //     code:200,
    //     info:'Welcome, This is a wonderful site',
    //     ip:ip,
    //     links:{
    //         v1: protocol + '://' + host + '/v1/',
    //         home:'https://github.com/xCss/JsonBird',
    //         HowToUse:'https://github.com/xCss/JsonBird#how-to-use',
    //         issue:'https://github.com/xCss/JsonBird/issues'
    //     }
    // });
    var ip = req.ip;
    ip2address(ip,function(data){
        var params = {
            title:'Welcome | JsonBird - 业界领先的远程 JSON 代理服务'
        };
        if(data){
            params['address']='\n\r欢迎来自'+data.area+data.location+'的朋友';
        }
        res.render('welcome',params);
    });
    //res.render('welcome',{title:'Welcome | JsonBird - 业界领先的远程 JSON 代理服务'});
    
});

function ip2address(ip,callback){
    request('http://apis.juhe.cn/ip/ip2addr?ip='+ip+'&key=28c0a6a5eb9cca3f38bc5877a83c9868', function(err, res, body) {
        if (!err && res.statusCode == 200) {
            body = JSON.parse(body);
            console.log('Welcome:'+body['result']);
            callback && callback(body.result);
        } else {
            console.log(' / request info:'+err);
            callback && callback(null);
        }
    });
}


module.exports = router;
