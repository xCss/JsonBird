var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('test', { title: 'Express' });
    // request('https://bird.ioliu.cn/netease/?playlist_id=10998986', function(err, resp, body) {
    //     console.log(body);
    //     res.send(body);
    // });
    // var mydata = {
    //     url: 'CSMBP/data/service/discount/getMinPrice.do?type=MOBILE&token=E0xywTTmPMVVPd5B8u4cPvBMW2B4ZKPwpZ194hyuI%2FoDWG35pqOxAw%3D%3D&lang=zh',
    //     page: {
    //         "page": {
    //             "INTER": "N",
    //             "CHANNEL": "Mobile"
    //         }
    //     },
    //     pagebase: 'https://m.csair.com'
    // };
    var mydata = {
        name: 'zhangsan',
        pass: 'lisi'
    };

    request.post('http://localhost:3000/joke/', { form: mydata }, function(err, resp, body) {
        res.send(body);
    });
});
module.exports = router;