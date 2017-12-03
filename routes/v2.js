const express = require('express');
const request = require('request');
const router = express.Router();
const disabledIP = require('../utils/disabledIP').list;
const qs = require('qs');
const utils = require('../utils/utils');

router.get('/*', function(req, res, next) {
    convert(req, res, next)
});

router.post('/*', function(req, res, next) {
    convert(req, res, next)
});

const convert = (req, res, next) => {
    let params = utils.convert(req,res,next);
    let config = params[0];
    let protocol = params[1];
    let host = params[2];
    let cb = params[3];
    let output = {
        data: {},
        status: {
            code: -1,
            message: 'Please Set URL Like This: ' + protocol + '://' + host + '/v2/?url=http[s]://YourWantProxyUrl.Com'
        }
    };
    if(config.url){
        utils.createServer(config).then(ret => {
            cb && res.jsonp(ret) || res.send(ret);
        }).catch(ex => {
            output = {
                status: {
                    code: -2,
                    message: Object.keys(ex).length>0 ? ex : 'unknow error, please checked your link' 
                }
            }
            cb && res.jsonp(output) || res.send(output);
        });
    }else{
        cb && res.jsonp(output) || res.send(output);
    }
}

module.exports = router;