var express = require('express');
var request = require('request');
var router = express.Router();
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",'3.2.1');
    res.header("Vary","Origin");
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();
});
router.get('/',function(req, res, next){
    if(req.originalUrl == /v1/){
        return res.send({
            info:'please set params like this: https://api.ioliu.cn/v1?url=http[s]://YourWantProxyUrl.com'
        });
    }
    var url = req.originalUrl.replace('/v1/?url=','');
    console.log(url);
    getJSON(url,function(data){
        return res.send(data);
    })
    //return res.send({url:url});
});

function getJSON(url,callback,next){
    request(url,function(err,res,body){
        if(!err && res.statusCode == 200){
            callback&&callback(body);
        }else{
            console.log(err);
        }
    });
}


module.exports = router;
