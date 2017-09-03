const request = require('request');
const qs = require('qs');
/**
 * 公共请求
 * @param {Object} config 
 * @return {Object} Promise
 */
const createServer = (config) => {
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
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    let _params = method === 'GET' ? req.query : req.body;
    let cb = _params.callback;
    let headers = req.headers;
    let config = {
        method: method,
        gzip: true
    };
    let params = {};
    for (let i in _params) {
        let temp = _params[i];
        if (i === 'url') {
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
        } else {
            params[i] = temp;
        }
    }
    if (method === 'POST') config['json'] = params;
    else config['url'] = config['url'] ? `${config['url']}?${qs.stringify(params)}` : (url?`${url}?${qs.stringify(params)}`:null) ;
    config['headers'] = headers;
    return [config,protocol,host,cb,params]
}

module.exports = {
    convert,
    createServer
}