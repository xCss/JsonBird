//https://github.com/mysqljs/mysql#readme
var mysql = require('mysql');
//获取数据库配置
var config = require('../configs/config').mysql_dev;
//使用连接池
var pool = mysql.createPool(config);
//存储
module.exports = {
    //添加/修改数据
    set: function(key, val) {

    },
    //获取数据
    get: function(key) {

    },
    //删除数据
    del: function(key) {

    }
};