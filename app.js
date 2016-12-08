var express = require('express');
var request = require('superagent');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
//Welcome Page
var welcome = require('./routes/welcome');
//日志输出
var logUtils = require('./utils/logUtils');
//查询ip
var ip = require('./routes/ip');
//网易云音乐
var netease = require('./routes/netease');
//JsonBird version 1.0
var v1 = require('./routes/v1');
//笑话接口
var joke = require('./routes/joke');
//手机号码归属地接口
var mobile = require('./routes/mobile');
//天气
var weather = require('./routes/weather');
//test
var test = require('./routes/test');

var app = express();

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');
app.enable('trust proxy');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('combined', {
//     skip: function(req, res) { return res.statusCode < 400 }
// }));
//app.use(bodyParser.raw({ type: '*/*' }));
/***
 * 全局过滤:统计和日志
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    var protocol = req.protocol;
    var host = req.hostname;
    var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    var ref = req.headers.referer;
    var originalUrl = req.originalUrl;
    var logs = {
        IP: ip,
        Host: host,
        Referer: ref,
        //Protocol: protocol, 
        OriginalUrl: originalUrl,
        Time: new Date().toLocaleString(),
        params: JSON.stringify(req.body || req.query)
    };

    // console.log(logs);
    // console.log(req.cookies);
    /**
     * 不记录日志和统计的请求:
     *      *.css 
     *      favicon.ico
     *      robots.txt
     *      图片文件
     *      (JS文件可能有特殊统计需求，需要单独判断)
     */
    var filter = /_detect|\.css|favicon\.ico|robots\.txt|\.png|\.jpg|\.gif/i.test(originalUrl);
    if (!filter) {
        //暂时屏蔽掉*.js日志的记录
        if (originalUrl.indexOf('.js') === -1) {
            //如果存在引用网址，则打印日志
            //if(!!logs['Referer']) 
            //暂时不需要打印
            //logUtils.print(logs);
        }
    }
    // 处理OPTIONS请求
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

//静态文件访问路径
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(favicon(__dirname + '/static/images/favicon.ico'));



//app.use('/', welcome);
app.use('/test', test);
app.use('/ip', ip);
app.use('/v1', v1);
app.use('/netease', netease);
app.use('/joke', joke);
app.use('/mobile', mobile);
app.use('/weather', weather);

/**
 * Robots.txt
 */
app.use('/robots.txt', function(req, res, next) {
    res.header('content-type', 'text/plain');
    res.send('User-Agent: * \nAllow: /');
});

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
            data: {},
            status: {
                code: err.status,
                message: err.message
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        data: {},
        status: {
            code: err.status,
            message: err.message
        }
    });
});



module.exports = app;