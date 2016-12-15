/**
 * Created by Administrator on 2016/12/12.
 */
var tools=require('../util/tools');

var b2cSearch={
    Action:"B2CSEARCH",
    SerialNo:"HEZ000008304516161",
    BeginDate:"20161101",
    EndDate:"20161201"
};

var checkx={
    Action:"ICBCCHKX",
    BeginTime:"2016-11-01",
    EndTime:"2016-12-01",
    //CNParam:"汉字说明",
    PayType:6,
    Page:1
};


tools.send(checkx,function(status,value,err){
        if(err){
           console.dir(err);
       }else {
           console.log('status=', status);
           console.log(JSON.parse(value.replace(/'/g,"\"").replace(/\t/gi,'\\t').replace(/\n/gi,'\\n')));
       }
});






