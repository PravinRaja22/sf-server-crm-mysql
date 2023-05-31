const { executeQuery } = require('../../db/mySql');
const getFields = async (request,reply) =>{
    try {
        var sql ='SHOW COLUMNS FROM '+request.query.object;
        let result = await executeQuery(sql,[])
        let field=[]
        result.forEach(e =>{
            console.log(e.Field)
            field.push(e.Field)
        })
        console.log(field)
        reply.send(field)
        
    } catch (e) {
        console.log("inside Show table error is "+e.message)
        reply.send(e.message)   
    }
}

module.exports  = {getFields}