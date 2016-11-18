## Overview
- [v1](#-v1-)
- [ip](#-ip-)
- [joke](#-joke-)
- [mobile](#-mobile-)
- [netease](#-netease-)
- [weather](#-weather-)


## `v1`代理接口：
- 请求方式：`GET/POST`
- 请求地址：https://bird.ioliu.cn/v1
- 返回值类型：`json/jsonp`  

|名称|类型|必须|说明|  
|----|----|----|----|
|url|string|是|需要代理的远程数据接口|
|callback|string|否|回调函数名|

## `ip`地址查询接口
- 请求方式：`GET/POST`
- 请求地址：https://bird.ioliu.cn/ip
- 返回值类型：`json/jsonp/xml`

|名称|类型|必须|说明|  
|----|----|----|----|
|ip|string|否|要查询的ip，(不带ip参数则查询当前浏览者ip)|
|type|string|否|返回数据的格式,`xml`或`json`，默认`json`|
|callback|string|否|回调函数名|

## `joke`笑话接口
- 请求方式：`GET/POST`
- 趣图地址: https://bird.ioliu.cn/joke/
- 笑话地址: https://bird.ioliu.cn/joke/?type=text
- 随机趣图: https://bird.ioliu.cn/joke/rand
- 随机笑话: https://bird.ioliu.cn/joke/rand?type=text
- 返回值类型：`json/jsonp`

> ⚠️ 若`sort`存在，则`time`必须同时存在  
⚠️ 随机获取链接不需要参数`page、pagesize、sort、time`

|名称|类型|必须|说明|  
|----|----|----|----|
|type|string|否|类型, (pic:趣图, text:笑话, 默认pic)|
|page|int|否|当前页数,默认1|
|pagesize|int|否|每次返回条数,默认1,最大20|
|sort*|string|否|类型，desc:指定时间之前发布的，asc:指定时间之后发布的|
|time*|string|否|时间戳（10位），如：1418816972|
|callback|string|否|回调函数名|

## `mobile`手机号码接口
- 请求方式：`GET/POST`
- 请求地址：https://bird.ioliu.cn/mobile
- 返回值类型：`json/jsonp/xml`

|名称|类型|必须|说明|  
|----|----|----|----|
|phone|string|是|需要查询的手机号码或手机号码前7位|
|type|string|否|返回数据的格式,`xml`或`json`，默认`json`|
|callback|string|否|回调函数名|

## `netease`网易云音乐接口
- 请求方式：`GET`
- 歌曲接口：https://bird.ioliu.cn/netease?id=222222
- 歌单接口：https://bird.ioliu.cn/netease?playlist_id=222222
- 返回值类型：`json/jsonp`

|名称|类型|必须|说明|  
|----|----|----|----|
|id/playlist_id|string|是|`id/playlist_id`:需要查询的歌曲或者歌单`id`|
|callback|string|否|回调函数名|

## `weather`天气查询接口
- 请求方式：`GET/POST`
- 请求地址：https://bird.ioliu.cn/weather
- 返回值类型：`json/jsonp/xml`

|名称|类型|必须|说明|  
|----|----|----|----|
|city|string|是|要查询的城市，如：温州、上海、北京|
|type|string|否|返回数据的格式,`xml`或`json`，默认`json`|
|callback|string|否|回调函数名|
