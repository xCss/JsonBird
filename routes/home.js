var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",'3.2.1');
    res.header("Vary","Origin");
    res.header("Content-Type", "application/json;charset=utf-8");  
    return res.send({
        code:200,
        home:'https://ioliu.cn',
        versions:{
            v1:'https://api.ioliu.cn/v1/'
        }
    });
});

module.exports = router;
