# JsonBird :hatching_chick:
A remote data interface proxy service | 一个远程数据接口代理服务


![npm:v3.10.3](https://img.shields.io/badge/npm-v3.10.3-blue.svg)
![express:v4.13.4](https://img.shields.io/badge/express-v4.13.4-blue.svg)
![node.js support:v0.10.0+](https://img.shields.io/badge/node.js%20supports-v0.10.0+-green.svg)
![build:passing](https://img.shields.io/badge/build-passing-green.svg)
[![license:MIT](https://img.shields.io/badge/license-MIT-blue.svg)](/License)
[![releases:v1.4.2](https://img.shields.io/badge/releases-v1.4.2-blue.svg)](https://github.com/xCss/JsonBird/releases)

**[HomePage](https://bird.ioliu.cn)** | [Demo](https://jsfiddle.net/LNing/duL5Lby7/)

## 必要条件
- [Node.js](https://nodejs.org) 0.10+
- [npm](https://www.npmjs.com/) (normally comes with Node.js)
 
## 安装、运行、访问，一气呵成
``` bash
# clone
$ git clone https://github.com/xcss/JsonBird.git
# install
$ cd JsonBird && npm i
# run service
$ npm start
# open your browser,input link `http://127.0.0.1:1000`
```

## 快速开始
 1. https://bird.ioliu.cn/v1?url=http[s]://YouWantProxyJSONUrls.com&[?]params1=val1&params2=val2[&callback=fn]
 2. [详细食用方法请点此](https://github.com/xCss/JsonBird/wiki)

## 你能得到
1. :sparkles: 让不支持跨域的远程数据接口支持跨域
2. :muscle: 让不支持JSONP的远程数据接口支持JSONP (在URL后面添加`&callback=fn`)


## License

[MIT License](/License)
