var express = require('express');
var request = require('superagent');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log(req.headers['User-Agent']);
    res.send(req.headers)
        // var mydata = {
        //     page: 1,
        //     pagesize: 6
        // };

    // request.post('https://bird.ioliu.cn/joke/').send(mydata).end(function(err, resp) {
    //     var body = resp.text || resp.body || {};
    //     res.send(body);
    // });
});
module.exports = router;