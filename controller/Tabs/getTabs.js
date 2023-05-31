const { checkObjectAccess } = require("../authorization/checkAccess2")

const getTabs = async (request,reply) =>{
    try {
        console.log("inside get Tabs")
        let {department,role} = request.query
        console.log("Query is ")
        console.log(request.query)
        
        let accessedObject = await checkObjectAccess(department,role)
        console.log(accessedObject)
        reply.send(accessedObject)
    } catch (error) {
        console.log("error in get Tabs : ",error.message)
        reply.send(error.message)
        
    }
    
}
module.exports = {getTabs}
