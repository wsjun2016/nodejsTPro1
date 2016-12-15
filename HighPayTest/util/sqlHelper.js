/**
 * Created by Administrator on 2016/12/6.
 */
var mssql=require("mssql");
var user="sa",
    password="123456",
    server="localhost",
    database="myDb";

var config={
    user:user,
    password:password,
    server:server, // You can use 'localhost\\instance' to connect to named instance
    database:database,
    /*option:{
     encrypt:true //Use this if you're on Windows Azure
     },*/
    pool:{
        min:0,
        idleTimeoutMillis:3000
    }
};

var initConfig=function(user,password,server,database){
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

var restoreDefaults = function () {
    config = {
        user: user,
        password: password,
        server: server, // You can use 'localhost\\instance' to connect to named instance
        database: database,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        },
        pool: {
            min: 0,
            idleTimeoutMillis: 3000
        }
    };
};
/*

var querySql=function(sql,params,callBack){
    var connection = new mssql.connect(config,function(err){
        var ps=new mssql.PreparedStatement(connection);
        if(params!=null){
            for(var index in params){
                if(typeof params[index] == "number"){
                    ps.input(index,mssql.Int);
                }else if(typeof param[index] == "string"){
                    ps.input(index,mssql.NVarChar);
                }
            }
        }
        ps.prepare(sql,function(err){
            if(err)
                console.log(err);
            ps.execute(params,function(err,recordset){
                callBack(err,recordset);
                ps.unprepare(function(err){
                    if(err)
                        console.log(err);
                });
            });
        });
    });
    restoreDefaults();
};
*/


var param={
    ID:{
        sqlType:mssql.BigInt,
        inputValue:1
    }
};

var execute=function(procName,params,func){
    var connection= new mssql.Connection(config,function(err){
        var request=new mssql.Request(connection);
        if(params!=null) {
            for(var index in params){
                console.log(params[index].inputValue );
               request.input(index,params[index].sqlType,params[index].inputValue);
            }
        }
        request.execute(procName,function(err,recordsets,returnValue){
            func(err,recordsets,returnValue);
        });
    });
    connection.on("error",function(err){
        //console.log("Connection error is "+err);
        func(err,undefined,undefined);
    });
};

/*execute("P_L_GetAllData",param,function(err,recordset,returnvalue){
    if(err)
        console.log(err);
    else{
        console.log(recordset);
    }
});*/


/*var paramadd={
    UserName:{
        sqlType:mssql.NVarChar,
        inputValue:"张三"
    },
    pwd:{
        sqlType:mssql.VarChar,
        inputValue:"289jsd3fds"
    }
};
execute("P_UIT_Add",paramadd,function(err,recordset,returnvalue){
    if(err)
        console.log(err);
    else
        console.log(recordset);
});*/


var paramupdate={
    ID:{
        sqlType:mssql.Int,
        inputValue:2
    },
    UserName:{
        sqlType:mssql.NVarChar,
        inputValue:"李四"
    },
    pwd:{
        sqlType:mssql.VarChar,
        inputValue:"1234567890"
    }
};

execute("P_UIT_Update",paramupdate,function(err,recordset,returnValue){
    if(err)
        console.log(err);
    else
        console.log(recordset.affectedRows);
});




//exports.initConfig=initConfig;
//exports.config=config;
//exports.querySql=querySql;
//exports.executeDataSet=ExecuteDataSet;
//exports.restoreDefaults=restoreDefaults;

