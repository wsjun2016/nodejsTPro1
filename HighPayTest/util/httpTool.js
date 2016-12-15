/**
 * Created by Administrator on 2016/12/13.
 */

var http=require('http');
var qs=require('querystring');
var Iconv = require('iconv-lite');

/**发送post请求
 * @param hostname 请求的主机地址 如：127.0.0.1
 * @param port 端口号 如：80
 * @param path 请求的路径 如：'/home'
 * @param reqcharset 请求的chatset编码
 * @param rescharset 响应的chatset编码
 * @param param 请求参数字符串
 * @param func 回调方法 有三个参数 status：响应状态 value：响应值 error：错误信息
 */
exports.post=function(hostname,port,path,reqcharset,rescharset,param,func){
    try {
        var content="";
        if (param)
            content = param;

        if(reqcharset==undefined || reqcharset==null || reqcharset=='')
            charset='utf-8';

        if(rescharset==undefined || rescharset==null || rescharset=='')
            charset='utf-8';

        if (path == undefined || path == null || path == '')
            path = "/";

        if(port==undefined || port==null || port=='' || parseInt(port)<=0)
            port=80;

        var options = {
            hostname: hostname,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': ('application/x-www-form-urlencoded; charset=' + reqcharset)
            }
        };

        var req = http.request(options, function (res) {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            //res.setEncoding('utf8');
            //console.log('request url：',options.hostname,options.port,options.path);

            var data = "";
            //接收数据
            res.on('data', function (chunk) {
                var value = Iconv.decode(chunk, rescharset).toString();
                data += value;
            });

            //接收数据完毕
            res.on('end', function () {
                func(res.statusCode, data,undefined);
            });
        });

        //产生错误
        req.on('error', function (err) {
            //console.log('problem with request: ' + e.message);
            func(undefined,undefined,err);
        });

        // write data to request body
        req.write(content);
        req.end();
    }catch (e){
        func(undefined,undefined,e);
    }

};

/*
var postData={
    a: 123,
    time: new Date().getTime(),
    sno:'thisiszifc',
    snu:'{\'sdf\':\'32fsd\'}'

};//这是需要提交的数据

var content=qs.stringify(postData);

var options={
    hostname:'54.223.103.139',
    port:80,
    path:'/',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
    }
};

var req=http.request(options,function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    //res.setEncoding('utf8');

    res.on('data', function (chunk) {
        console.log('BODY: ' + Iconv.decode(chunk, 'gb2312').toString());
    });
});

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(content);

req.end();

*/