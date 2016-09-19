//https://github.com/mysqljs/mysql#readme
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
//获取数据库配置
var config = require('../configs/config').mysql_dev;
//使用连接池
var pool = mysql.createPool(config);
//SESSION_SECRET
var sessionSECRET = process.env.SESSION_SECRET || "faFJDSLNFFJLsEknnqWSDlweifsNIW";
console.log(sessionSECRET);
//公共连接设置
var commonFormat = function(callback) {
    pool.getConnection(function(err, connection) {
        //console.log(callback);
        //自定义参数匹配设置
        connection.config.queryFormat = function(query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function(txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
        callback && callback(err, connection);
    });
};

//存储
module.exports = {
    //添加/修改数据
    set: function(params) {
        var password = '12345' + sessionSECRET;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        console.log(hash);
        console.log(bcrypt.compareSync(password + 'x', hash));
        // var sql = 'select 1+1 as test';
        // pool.query(sql, function(err, rows, fields) {
        //     console.log(err);
        //     console.log(rows);
        //     console.log(fields);
        // });
        var sql = 'select MD5("123456") as calc';
        // commonFormat(function(err, connection) {
        //     connection.query(sql, { id: 1 + 1 }, function(err, rows) {
        //         //console.log(err);
        //         console.log(rows);
        //         console.log(rows.length)
        //     });
        // });
    },
    //获取数据
    get: function(key) {

    },
    //删除数据
    del: function(key) {

    },
    //事务
    transaction: function(params) {
        commonFormat(function(err, connection) {
            //Transaction Begin
            connection.beginTransaction(function(err) {
                if (err) throw err;
                var keys = [];
                var vals = [];
                connection.query('insert into :table(' + keys.join(',') + ') values(' + vals.join(',') + ') ', params, function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                    var insertId = result.insertId;
                    //Transaction Next
                    connection.query('insert into :table(' + keys.join(',') + ') values(' + vals.join(',') + ')', params, function(err, result) {
                        if (err) {
                            return connection.rollback(function() {
                                throw err;
                            });
                        }
                        //Transaction Commit
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    throw err;
                                });
                            }
                            console.log('Transaction Success!');
                        });
                    });
                });
            });
        });
    }
};