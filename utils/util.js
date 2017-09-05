const encrypt = require('./encrypt');
const request = require('request');
const superagent = require('superagent');
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
    // const requestServer = (config) => {
    //     options['uri'] = `http://music.163.com${config.path}`
    //     options['form'] = encrypt(config.params)
    //     return new Promise((resolve, reject) => {
    //         request(options, (err, ret, body) => {
    //             if (!err && ret.statusCode === 200) {
    //                 resolve(JSON.parse(body))
    //             } else {
    //                 reject(err)
    //             }
    //         })
    //     })
    // }

const requestServer = (config) => {
    //console.log(config)
    return new Promise((resolve, reject) => {
        superagent
            .post(`http://music.163.com${config.path}`)
            .set(options.headers)
            .send(encrypt(config.params))
            .end((err, res) => {
                if (err || !res.ok) {
                    reject(err)
                } else {
                    let ret = res.text || res.body
                    if (typeof ret === 'object')
                        resolve(ret)
                    else {
                        resolve(JSON.parse(ret))
                    }
                }
            })
    })
}

module.exports = {
    requestServer
}