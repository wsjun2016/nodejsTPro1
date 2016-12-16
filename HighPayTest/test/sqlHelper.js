/**
 * Created by Administrator on 2016/12/15.
 */
var sqlHelper=require('../util/sqlHelper');


/*

var param={
    ID:{
        sqlType:sqlHelper.sqlserver.Int,
        direction:sqlHelper.direction.Input,
        inputValue:1
    },
    OValue:{
        sqlType:sqlHelper.sqlserver.Int,
        direction:sqlHelper.direction.Output,
        outputValue:null
    }
};


sqlHelper.execute("P_UIT_Search",param,function(err,recordsets,returnValue,affected){
    if(err)
        console.log(err);
    else{
        console.log(recordsets);
        console.log(param.OValue.outputValue);

        console.log(returnValue);
        console.log(affected);
    }
});

*/

/*var updateParam={
    ID:{
        sqlType:sqlHelper.sqlserver.Int,
        direction:sqlHelper.direction.Input,
        inputValue:1
    },
    UserName:{
        sqlType:sqlHelper.sqlserver.NVarChar(50),
        direction:sqlHelper.direction.Input,
        inputValue:"夜月天"
    },
    pwd:{
        sqlType:sqlHelper.sqlserver.VarChar(200),
        direction:sqlHelper.direction.Input,
        inputValue:"0123456789asdfghjkl"
    }
};

sqlHelper.execute("P_UIT_Update",updateParam,function(err,recordsets,returnValue,affected){
    if(err)
        console.log(err);
    else{
        if(affected>0)
            console.log("更新成功！");
    }
});*/

/*
sqlHelper.query('select * from UserInfoTest ',function(err,recordsets,affected){
    if(err)
        console.log(err);
    else {
        console.log(recordsets);
        console.log(affected);
    }
});
*/

/*
var table=new sqlHelper.sqlserver.Table('UserInfoTest');
table.create=true;
//table.columns.add('id',sqlHelper.sqlserver.Int,{primary:true});
table.columns.add('name',sqlHelper.sqlserver.NVarChar(50),{nullable:true});
table.columns.add('pwd',sqlHelper.sqlserver.VarChar(200),{nullable:true});
table.rows.add('张1','jjasdfienf');
table.rows.add('张2','jjasdfienf');
table.rows.add('张3','jjasdfienf');

sqlHelper.bulkInsert(table,function(err,rowcount){
    if(err)
        console.log(err);
    else{
        if(table.rows.length==rowcount)
            console.log('OK');
        console.log(rowcount);
    }
});*/

/*
var paramQuery={
    name:{
        sqlType:sqlHelper.sqlserver.NVarChar,
        inputValue:"select * from UserInfoTest"
    },
    pwd:{
        sqlType:sqlHelper.sqlserver.VarChar,
        inputValue:"123455"
    }
};

sqlHelper.query("insert into UserInfoTest values(@name,@pwd)",paramQuery,function(err,recordsets,affected){
    if(err)
        console.log(err);
    else{
        console.log(recordsets);
        console.log(affected);
    }
});

*/



sqlHelper.queryViaStream('select * from UserInfoTest',null,{
    error:function(err){
        console.log(err);
    },
    columns:function(columns){
        console.log(columns);
    },
    row:function(row){
        console.log(row);
    },
    done:function(affected){
        console.log(affected);
    }
});










