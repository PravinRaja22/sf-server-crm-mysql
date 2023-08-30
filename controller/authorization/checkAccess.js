const { executeQuery } = require('../../db/mySql')
const checkAccess = async (request,reply) => {
    try {
        
        let {loginUserRole,loginUserDepartmentName,object} = request.body
        var sql = "select permissionSets from permissions where roleDetails ->'$.roleName'like '%" + loginUserRole + "%'and department  like '%" + loginUserDepartmentName + "%'";
        let result = await executeQuery(sql, [])
        let access = {}
        result.forEach((variable) => {
            JSON.parse(variable.permissionSets).forEach((e) => {
                if (e.object === object) {
                    console.log("Inside permisiion find");
                    console.log(e.permissions)
                    access = {
                        "Permission": e.permissions
                    }
                }
            })
        });
        console.log(access);
        console.log("access");
        reply.send(access.Permission) 
    }
    catch (error) {
        reply.send(error.mesage)
    }
}
module.exports = { checkAccess }