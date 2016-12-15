/**
 * Created by Administrator on 2016/12/12.
 */

var http=require('http');
var qs=require('querystring');
var Iconv = require('iconv-lite');
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







