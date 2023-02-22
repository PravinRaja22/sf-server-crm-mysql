const { executeQuery } = require('../../db/mySql')
const insertEmail =async (emailinfo)=>{

console.log("inside insert Emails");
try {
    console.log(emailinfo);
    let objdata = Object.keys(emailinfo);
    let objvalues = Object.values(emailinfo);
    let result = {};
    console.log("keys are : " + objdata);
    async function toObject(names, values) {
        for (let i = 0; i < names.length; i++) {
                result[names[i]] = values[i]
            
        }
    }
    toObject(objdata, objvalues)

    console.log(result);

    var sql = 'REPLACE INTO Email SET ?'
   
    let insertEmailsql = await executeQuery(sql, result)
    console.log(insertEmailsql)
    return insertEmailsql;
}
catch (err) {
    console.log('error in Email insertion '+err.message);
    return err.message
}

}

module.exports ={insertEmail}