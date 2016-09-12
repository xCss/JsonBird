module.exports = {
    log: function(params) {
        console.log(print(params));
    },
    warn: function(params) {

    },
    error: function(params) {

    },
}

var print = function(params) {
    var arr = ['-------------------------------------'];
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var datestr = date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ' ' + date.getMilliseconds() + 'ms';
    for (var i in params) {
        arr.push(i + ': ' + params[i]);
    }
    arr.push('Time: ' + datestr);
    arr.push('-------------------------------------');
    return arr.join('\n');
}