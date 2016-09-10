var express = require('express');
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
    res.render('welcome',{title:'Welcome'});
});

module.exports = router;
