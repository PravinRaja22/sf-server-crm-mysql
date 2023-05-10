const { checkObjectAccess } = require("../authorization/checkAccess2")

const getTabs = async (request,reply) =>{
    try {
        console.log("inside get Tabs")
        let {loginUserRole,loginUserDepartmentName} = request.body
        let accessedObject = await checkObjectAccess(loginUserRole,loginUserDepartmentName)
        console.log(accessedObject)
        reply.send(accessedObject)
    } catch (error) {
console.log("error in get Tabs : ",error.message)
        reply.send(error.message)
        
    }
    
}
module.exports = {getTabs}
