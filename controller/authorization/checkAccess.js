const { executeQuery } = require('../../db/mySql')
const checkAccess = async (request,reply) => {
    try {
        let role = request.body.loginUserRole;
        let department = request.body.loginUserDepartmentName
        let object = request.body.object
        var sql = "select permissionSets from permissions where roleDetails ->'$.roleName'like '%" + role + "%'and department  like '%" + department + "%'";
        let result = await executeQuery(sql, [])
        let access = {}
        result.forEach((variable) => {
            JSON.parse(variable.permissionSets).forEach((e) => {
                if (e.object === object) {
                    console.log(e.permissions)
                    access = {
                        "Permission": e.permissions
                    }
                }
            })
        });
        reply.send(access.Permission) 
    }
    catch (error) {
        reply.send(error.mesage)
    }
}
module.exports = { checkAccess }