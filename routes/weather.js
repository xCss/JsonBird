let express = require('express');
let request = require('superagent');
let utils = require('../utils/utils');
let router = express.Router();
let base = 'http://op.juhe.cn/onebox/weather/query';
let key = 'e0540a109f5a73e9df2981cdeb9d106f';
let cookie = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36' };
router.get('/*', function(req, res, next) {
    getWeather(req, res, next);
});
router.post('/*', function(req, res, next) {
    getWeather(req, res, next);
});

let getWeather = (req, res, next) => {
    let params = utils.convert(req,res,next,base);
    let config = params[0];
    let protocol = params[1];
    let host = params[2];
    let cb = params[3];
    let _params = params[4];
    let output = {
        data: {},
        status: {
            code: -1,
            message: ' city name is empty.'
        }
    };
    if(_params['cityname']){
        config['uri'] = `${config['uri']}&key=${key}`;
        config['gzip'] = '';
        utils.createServer(config).then(ret => {
            cb && res.jsonp(ret) || res.send(ret);
        }).catch(ex => {
            output = {
                status: {
                    code: -2,
                    message: Object.keys(ex).length>0 ? ex : 'unknow error, please checked your city name' 
                }
            }
            console.log(`cb:${cb}`)
            cb && res.jsonp(output) || res.json(output);
        });
    }else{
        cb && res.jsonp(output) || res.json(output);
    }
}

module.exports = router;