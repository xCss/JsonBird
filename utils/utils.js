const request = require('request');
const qs = require('qs');
/**
 * 公共请求
 * @param {Object} config 
 * @return {Object} Promise
 */
const createServer = (config) => {
    //console.log(config)
    return new Promise((resolve, reject) => {
        request(config, (err, ret, body) => {
            if (!err) {
                resolve(body)
            } else {
                reject(err)
            }
        })
    })
}
/**
 * 转换对象
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @return {Array} [config,protocol,host,cb]
 */

const convert = (req,res,next,url) => {
    let host = req.hostname;
    let protocol = req.protocol;
    let method = req.method.toUpperCase();
    //console.log(method)
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    let _params = method === 'GET' ? req.query : req.body;
    _params['url'] = req.body.url || req.query.url || '';
    let cb = _params.callback;
    let headers = req.headers;
    //console.log(req.headers.referer || req.headers.referrer)
    let config = {
        method: method,
        gzip: true
    };
    let params = {};
    for (let i in _params) {
        let temp = _params[i];
        if (i === 'url' && temp) {
            let o = temp.split('?');
            let uri = o[0]
            config['url'] = uri;
            headers['host'] = uri.replace(/^(http|https):\/\//g, '').split('/')[0];
            if (o.length > 1) {
                o[1].split('&').forEach(item => {
                    let k = item.split('=');
                    params[k[0]] = encodeURI(k[1]);
                })
            }
        }else if(i=='headers'){
            let _t = temp || '{}'
            let _chs = eval(`(${_t})`)
            for(let ch in _chs){
                headers[ch] = _chs[ch]
            }
        } else {
            params[i] = temp;
        }
    }
    let _hs = headers
    let hs = {}
    for(let _h in _hs){
        let h = _hs[_h]
        if(/(content-length)/.test(_h)) continue
        else hs[_h] = _hs[_h]
    }
    //console.log(hs)
    if (method === 'POST') config['form'] = params;
    else config['url'] = config['url'] ? `${config['url']}?${qs.stringify(params)}` : (url?`${url}?${qs.stringify(params)}`:null) ;
    config['headers'] = hs;
    return [config,protocol,host,cb,params]
}

module.exports = {
    convert,
    createServer
}