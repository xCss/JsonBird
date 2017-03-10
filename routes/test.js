var express = require('express');
var request = require('superagent');
var router = express.Router();
var crypto = require('../utils/Crypto');
/* GET test page. */
router.get('/', function(req, res, next) {
    var id = req.query.id || '';
    if (id) {
        var sid = crypto.encrypted_id(id);
        var k = 'http://m2.music.126.net/' + sid + '/' + id + '.mp3'
        res.send({
            link: k
        });
    } else {
        res.send({ msg: 'no id' });
    }
});


module.exports = router;