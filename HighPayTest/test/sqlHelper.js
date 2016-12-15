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

var updateParam={
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
});
