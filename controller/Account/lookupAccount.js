const { executeQuery } = require('../../db/mySql')
const lookupAccount =async (request,reply)=>{

if(!request.query.searchKey){
    try {
        console.log("inside Account lookup ");
        var sql = "select _id,accountName from account limit 5";
        let getAccountdata = await executeQuery(sql, [])
        let accountName=[];
        getAccountdata.forEach(element => {
            accountName.push({
                accountName:element.accountName,
                id:element._id
            })
        });
        reply.send(accountName)
    
    }
    catch (err) {
        console.log("inside Account lookup error page");
        reply.send(err.message)
    
    }
}
else if (request.query.searchKey){
    console.log("inside else if lookup Account");
    console.log(request.query.searchKey);
    try {
        console.log("inside Account lookup with searchkey");
        var sql = "select _id,accountName from account WHERE accountName like '%" + request.query.searchKey + "%'";
        let getAccountdata = await executeQuery(sql, [])
        let accountName=[];
        getAccountdata.forEach(element => {
            accountName.push({
                accountName:element.accountName,
                id:element._id
            })
        });
        reply.send(accountName)
    
    }
    catch (err) {
        console.log("inside Account lookup error page");
        reply.send(err.message)
    
    }


}

}
module.exports = {lookupAccount}