const { executeQuery } = require('../../db/mySql');
const getrelatedFile = async (request,reply) =>{
    try {
       const {id,object}=request.query;
       console.log("id : ",id);
       console.log("object : ",object);
       var sql =   `SELECT * FROM file WHERE relatedTo->'$.id' = ${id} AND relatedTo->'$.object' =${JSON.stringify(object)}`;
       let result = await executeQuery(sql, []);
        let field=[];
        result.forEach(e =>{
            console.log(e.Field);
            field.push(e.Field);
        })
        reply.send(result);
        
    } catch (e) {
        console.log("inside Show table error is "+e.message);
        reply.send(e.message);
    }
}

module.exports  = {getrelatedFile}