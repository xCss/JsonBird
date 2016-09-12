var express = require('express');
var request = require('request');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
//暂时不需要本地化
//moment.locale('zh-cn');
//Welcome Page
var welcome = require('./routes/welcome');
//日志输出
var logUtils = require('./utils/logUtils');
//网易云音乐
var netease = require('./routes/netease');
//JsonBird version 1.0
var v1 = require('./routes/v1');

var app = express();
//app.listen(process.env.PORT || 5000);

/***
 * 获取引用网站
 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '1.0.0');
    res.header("Vary", "Origin");

    var protocol = req.protocol;
    var host = req.hostname;
    var ip = req.ip;
    var ref = req.headers.referer;
    var originalUrl = req.originalUrl;
    var logs = {
        IP: ip,
        Host: host,
        Referer: ref,
        //Protocol: protocol, 
        OriginalUrl: originalUrl, 
        Time:moment().format('YYYY-MM-DD HH:mm:ss.ms')
    };
    /**
     * 不统计和记录日志的请求:
     * _detect 估计是DaoCloud 探测机器人
     * *.css 
     * favicon.ico
     * (JS文件可能有特殊统计需求，需要单独判断)
     */
    if (!/\/_detect/.test(originalUrl) && !/.css$/.test(originalUrl) && !/favicon.ico/.test(originalUrl)) {
        if (originalUrl.indexOf('/bing/') > -1 || originalUrl.indexOf('/assets/') > -1) {
            var err = new Error('这个接口已经改了，请不要在访问这个接口了..., 新的接口:https://bird.ioliu.cn/v1/');
            err.status = 404;
            next(err);
            return;
        }
        //暂时屏蔽掉*.js日志的记录
        if (originalUrl.indexOf('.js') === -1) {
            //如果存在引用，则打印日志
            //if(!!logs['Referer']) 
            logUtils.print(logs);
        }
    }
    next();

});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.enable('trust proxy');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static/', express.static(path.join(__dirname, 'public')));

app.use('/', welcome);
app.use('/v1', v1);
app.use('/netease', netease);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            code: err.status,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        code: err.status,
        message: err.message,
        error: {}
    });
});



module.exports = app;