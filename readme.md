## JsonBird
A JSON Remote Agent Service | 一个远程JSON代理服务

![npm:v3.10.3](https://img.shields.io/badge/npm-v3.10.3-blue.svg)
![express:v4.13.4](https://img.shields.io/badge/express-v4.13.4-blue.svg)
![node:v6.3.1](https://img.shields.io/badge/node-v6.3.1-blue.svg)
![build:passing](https://img.shields.io/badge/build-passing-green.svg)
![license:MIT](https://img.shields.io/badge/license-MIT-green.svg)
[![releases:v1.0.0](https://img.shields.io/badge/releases-v1.0.0-blue.svg)](https://github.com/xCss/JsonBird/releases)


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

[MIT License](/license)
