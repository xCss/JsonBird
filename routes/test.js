var express = require('express');
var request = require('superagent');
var router = express.Router();
var crypto = require('crypto');
/* GET test page. */
router.get('/', function(req, res, next) {
    var id = req.query.id || '';
    if (id) {
        var sid = encrypted_id(id);
        var k = 'http://m2.music.126.net/' + sid + '/' + id + '.mp3'
        res.send({
            link: k
        });
    } else {
        res.send({ msg: 'no id' });
    }
});

function encrypted_id(id) {
    var res = {
        id: id
    };
    var magic = Buffer.from('3go8&$8*3*3h0k(2)2', 'ascii');
    var len = magic.length;
    var sid = Buffer.from(id, 'ascii');
    for (var i in sid) {
        sid[i] = sid[i] ^ magic[i % len];
    }
    var m = crypto.createHash('md5');
    sid = m.update(sid).digest();
    res['md5'] = sid;
    var result = sid.toString('base64');
    result = result.replace(/\//g, '_').replace(/\+/g, '-')
    return result;
}

module.exports = router;