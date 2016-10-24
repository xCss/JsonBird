let express = require('express');
let request = require('superagent');
let router = express.Router();
const key = '64a40e3c55e88cc8cd66a78d030bddce';
/**
 * Get 请求
 */
router.get('/', function(req, res, next) {
    getJOKE(req, res, next);
});
/**
 * 随机获取
 */
router.get('/rand', function(req, res, next) {
    getJOKE(req, res, next, 'rand');
});

/**
 * Post 请求
 */
router.post('/', function(req, res, next) {
    getJOKE(req, res, next);
});
/**
 * 随机获取 
 */
router.post('/rand', function(req, res, next) {
    getJOKE(req, res, next, 'rand');
});

/**
 * 统一的请求
 */
function getJOKE(req, res, next, op) {
    let page = req.query.page || req.body.page || 1;
    let pagesize = req.query.pagesize || req.body.pagesize || 1;
    let sort = req.query.sort || req.body.sort;
    let time = req.query.time || req.body.time;
    let type = req.query.type || req.body.type || 'pic';
    let callback = req.query.callback || req.body.callback;
    let url = '';
    if (!!op && op === 'rand') {
        if (type !== 'pic') {
            type = null;
        }
        url = "http://v.juhe.cn/joke/randJoke.php?key=" + key;
        if (!!type) {
            url += "&type=" + type;
        }
    } else {
        url = "http://japi.juhe.cn/joke/";
        if (!!type && type === 'text') {
            url += "content/text.from?key=";
        } else {
            url += "img/text.from?key=";
        }
        url += key + "&page=" + page + "&pagesize=" + pagesize;
        if (!!sort && !!time) {
            url += "&sort=" + sort + "&time=" + time;
            url = url.replace(/text/, 'list');
        }
    }
    let output = {
        data: {},
        status: {
            code: 200,
            message: ''
        }
    };
    request.get(url).end(function(err, response) {
        let body = response.text || response.body;
        if (typeof body === 'string') {
            try {
                body = JSON.parse(body);
            } catch (e) {
                output.status = {
                    code: -1
                };
            }
        }
        output.data = (body.result && body.result.data ? body.result.data : body.result) || {};
        if (!err && response.statusCode === 200 && body.error_code === 0) {
            //
        } else {
            output.status = {
                code: -1,
                message: err || body.reason || 'Something bad happend.'
            };
        }
        if (callback) {
            return res.jsonp(output);
        } else {
            return res.json(output);
        }
    });
}



module.exports = router;