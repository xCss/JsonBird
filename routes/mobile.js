const express = require('express');
const request = require('superagent');
const utils = require('../utils/utils');
const router = express.Router();
const base = 'http://jshmgsdmfb.market.alicloudapi.com/shouji/query';
const APPCODE = 'c8c963a57cd7452a962e53653f03d2f6';
router.get('/', function(req, res, next) {
    getMobile(req, res, next);
});
router.post('/', function(req, res, next) {
    getMobile(req, res, next);
});

let getMobile = (req, res, next) => {
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
            message: 'phone number is empty.'
        }
    };
    if(_params['shouji']){
        config['headers']['Authorization'] = `APPCODE ${APPCODE}`;
        res.send(config)
        utils.createServer(config).then(ret => {
            console.log(1)
            cb && res.jsonp(ret) || res.send(ret);
        }).catch(ex => {
            console.log(ex)
            output = {
                status: {
                    code: -2,
                    message: Object.keys(ex).length>0 ? ex : 'unknow error, please checked your phone number' 
                }
            }
            cb && res.jsonp(output) || res.send(output);
        });
    }else{
        cb && res.jsonp(output) || res.send(output);
    }
}

module.exports = router;