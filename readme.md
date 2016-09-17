# JsonBird
A JSON Remote Agent Service | 一个远程JSON代理服务 

**[HomePage](https://bird.ioliu.cn)** | [Demo](https://jsfiddle.net/LNing/duL5Lby7/)

![npm:v3.10.3](https://img.shields.io/badge/npm-v3.10.3-blue.svg)
![express:v4.13.4](https://img.shields.io/badge/express-v4.13.4-blue.svg)
![node.js support:v0.10.0+](https://img.shields.io/badge/node.js%20supports-v0.10.0+-green.svg)
![build:passing](https://img.shields.io/badge/build-passing-green.svg)
[![license:MIT](https://img.shields.io/badge/license-MIT-blue.svg)](/License)
[![releases:v1.0.1](https://img.shields.io/badge/releases-v1.0.1-blue.svg)](https://github.com/xCss/JsonBird/releases)

## Table Of Contents
- [Requirements](#requirements)
- [Usage](#usage)
- [You can got](#you-can-got)
- [What's New](#whats-new)
- [License](#license)
## Requirements
Paddington requires the following to run:
- [Node.js](https://nodejs.org) 0.10+
- [npm](https://www.npmjs.com/) (normally comes with Node.js)

## Usage
> https://bird.ioliu.cn/v1/?url=http[s]://YouWantProxyJSONUrls.com&[?]params1=val1&params2=val2[&callback=fn]

## You can got
1. Enables cross-domain requests to any JSON API
2. Enables JSONP requests to any JSON API (Append `&callback=fn` to the end of the link)

## What's New
#### `2016-09-11`  新增网易云音乐接口 (`id[歌曲id]` or `playlist_id[歌单id]`二选一)  
1. 歌曲信息：https://bird.ioliu.cn/netease/?id=308353   
2. 歌单信息：https://bird.ioliu.cn/netease/?playlist_id=10998986   

## License

[MIT License](/License)
