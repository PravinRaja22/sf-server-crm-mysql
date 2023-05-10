const { executeQuery } = require('../../db/mySql');
const { checkObjectAccess } = require('../authorization/checkAccess2');

const getAllTable = async (request,reply) =>{
    try {
        var sql ='show tables';
        let result = await executeQuery(sql,[])
        let tablesArray=[]
        result.forEach(e=>{
            if(e.Tables_in_crm !== "email" && e.Tables_in_crm !=="picklist"){
                tablesArray.push(e)
            }
        })
        console.log(tablesArray)
        reply.send(tablesArray)
        
    } catch (e) {
        console.log("inside Show table error is "+e.message)
        reply.send(e.message)   
    }
}

module.exports  = {getAllTable}