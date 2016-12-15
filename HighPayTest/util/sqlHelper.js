/**
 * Created by Administrator on 2016/12/6.
 */
var mssql=require("mssql");

var sql={};

var config={
    user:"sa",
    password:"123456",
    server:"localhost", // You can use 'localhost\\instance' to connect to named instance
    database:"myDb",
    /*option:{
     encrypt:true //Use this if you're on Windows Azure
     },*/
    pool:{
        min:0,
        idleTimeoutMillis:3000
    }
};

sql.sqlserver=mssql;

sql.direction={
    Input:"input",
    Output:"output",
    Return:"return"
};

/**
 * 初始化连接参数
 * @param {string} user 用户名
 * @param {string} password 密码
 * @param {string} server 服务器地址
 * @param {string} database 数据库名称
 */
sql.initConfig=function(user,password,server,database){
    config={
        user:user,
        password:password,
        server:server, // You can use 'localhost\\instance' to connect to named instance
        database:database,
        /*option:{
         encrypt:true //Use this if you're on Windows Azure
         },*/
        pool:{
            min:0,
            idleTimeoutMillis: 3000
        }
    };
}

/**
 * 执行存储过程
 * @param {string} procedure 存储过程名称
 * @param {JSON} params 存储过程参数
 * @param {function} func 回调函数
 */
sql.execute=function(procedure,params,func){
    try {
        var connection = new mssql.Connection(config, function (error) {
            if(error)
                func(error);
            else {
                var request = new mssql.Request(connection);
                //request.verbose=true;
                if (params != null) {
                    for (var index in params) {
                        if (params[index].direction == sql.direction.Output) {
                            request.output(index, params[index].sqlType);
                        }
                        else {
                            request.input(index, params[index].sqlType, params[index].inputValue);
                        }
                    }
                }
                request.execute(procedure, function (error, recordsets, returnValue, affected) {
                    if (error)
                        func(error);
                    else {
                        for (var index in params) {
                            if (params[index].direction == sql.direction.Output) {
                                params[index].outputValue = request.parameters[index].value;
                            }
                        }
                        func(error, recordsets, returnValue, affected);
                    }
                });
            }
        });

        connection.on("error", func);

    }catch(e){
        func(e);
    }
};

module.exports=sql;

