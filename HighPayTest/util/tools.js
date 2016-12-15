/**
 * Created by Administrator on 2016/12/12.
 */
var qs=require('querystring');
var crypto=require('crypto');
var httptool=require('./httpTool');
var config=require('../config/config');

exports.send=function(obj,func){
    try {
        if (obj) {
            obj['UserCode'] = config.userCode;
            var param=combine(obj)+"&SignTime="+getTotalMilliseconds();
            //obj['Sign'] = SHA1Encript(param + config.key);
            //var param=param+"&Sign="+SHA1Encript(param);
            //console.log(qs.stringify(obj));
            param=param+"&Sign="+SHA1Encript(param + config.key);
            console.log(param);
            httptool.post(config.hostName, config.port, config.path, config.reqCharset,config.resCharset, param, func);
        }
    }catch (e){
        func(undefined,undefined,e);
    }
};

//组装url请求参数
function combine(obj){
    var value="",
        keys = Object.keys(obj).sort();

    if(obj){
        for (var i = 0, n = keys.length, key; i < n; ++i) {
            key = keys[i];
            value+="&"+key+"="+obj[key];
        }
        if(value.length>0)
            value=value.substring(1);
    }

    return value;
}

//获取两个日期之间的总毫秒数
function getTotalMilliseconds(){
    var date1=new Date("1970-01-01 00:00:00");
    var date2=new Date();
    return date2.getTime()-date1.getTime();
}

//sha加密
function SHA1Encript(param){
    var value="";

    if(param){
        var sha1 = crypto.createHash('sha1');
        //如果被加密串中有汉字，就需要指定utf8编码
        sha1.update(param,'utf8');
        value=sha1.digest('hex').toUpperCase();
    }

    return value;
}

//json对象key排序 升序
function sortDict(dict) {
    var dict2 = {},
        keys = Object.keys(dict).sort();

    for (var i = 0, n = keys.length, key; i < n; ++i) {
        key = keys[i];
        dict2[key] = dict[key];
    }
    return dict2;
}

