const Encrypt = require('crypto.js');
const request = require('request');
const qs = require('querystring');

let options = {
    method: 'POST',
    headers: {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'http://music.163.com',
        'Host': 'music.163.com',
        'Cookie': 'appver=2.0.2;',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
    }
}
const requestServer = (config) => {
    options['uri'] = `http://music.163.com${config.path}`
    let params = Encrypt(config.params)
    return new Promise((resolve, reject) => {
        request.post({ url: options.uri, form: params }, (err, ret, body) => {
            if (!err && ret.statusCode === 200) {
                resolve(JSON.parse(body))
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    requestServer
}