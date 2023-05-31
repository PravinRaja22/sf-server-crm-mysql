const { executeQuery } = require('../../db/mySql')

const checkObjectAccess = async (department,role) => {
    try {
        console.log("iniside object Access data "+role)
        console.log("inside check access 2 "+role , department)
        var sql = "select permissionSets from permissions where roleDetails ->'$.roleName'like '%" + role + "%'and department  like '%" + department + "%'";
        let result = await executeQuery(sql, [])
        let objectData = []
        result.forEach((variable) => {
            let data  =  JSON.parse(variable.permissionSets);
            data.filter(e =>{
                if(e.permissions.read == true){
                    console.log(e)
                    objectData.push(e.object)
                }
            })
            // JSON.parse(variable.permissionSets).forEach((e) => {
            // })
        });
        return objectData;

    }
    catch (error) {
       console.log(error.message)
    }
}


const checkAccess2 = async (role,department,object,accessData) => {
    try {
        console.log("inside check access 2 "+role , department , object , accessData)
        var sql = "select permissionSets from permissions where roleDetails ->'$.roleName'like '%" + role + "%'and department  like '%" + department + "%'";
        let result = await executeQuery(sql, [])
        let access = {}
        result.forEach((variable) => {
            JSON.parse(variable.permissionSets).forEach((e) => {
                if (e.object === object) {
                    access = {
                        "Permission": e.permissions[accessData]
                    }
                }
            })
        });
        console.log(access)
        return access.Permission
    }
    catch (error) {
       return error.mesage
    }
}
module.exports = { checkAccess2,checkObjectAccess }