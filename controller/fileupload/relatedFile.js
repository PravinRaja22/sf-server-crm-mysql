const { executeQuery } = require('../../db/mySql');
const getrelatedFile = async (request,reply) =>{
    try {
       const {id,object}=request.query
       console.log("id : ",id)
       console.log("object : ",object)
        var sql =`select * from files where $ relatedto ->'$.relatedto.object'like ${object} and $ relatedto ->'$.relatedto.id'like ${id}`
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

module.exports  = {getrelatedFile}