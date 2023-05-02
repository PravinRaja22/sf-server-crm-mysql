const { executeQuery } = require('../../db/mySql')

const getPermissions = async (request, reply) => {
    try {
        var sql = "select * from permissions"
        let getPermissionsdata = await executeQuery(sql, [])
        reply.send(getPermissionsdata)
    } catch (error) {

        console.log("error inside get permission is " + error.message)
        reply.send(error.message)
    }

}


const upsertPermissions = async (request, reply) => {
    try {
        console.log("inside insert Permissions");
        console.log("test Permissions ");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                console.log(names[i]+': '+values[i])
                result[names[i]] = values[i]
            }
        }
        toObject(objdata, objvalues)
        console.log(result);
        var sql = 'REPLACE INTO permissions SET ?'
        let insertPermission = await executeQuery(sql, result)
        console.log(insertPermission)
        reply.send("Permission inserted Successfully")
    }
    catch (err) {
        console.log('error in Permission insertion ', err.message);
        reply.send(err.message)
    }
}


const deletePermission = async (request, reply) => {
    console.log("inside detlete Permission");
    try {
        console.log('query:', request.query.code);
        let deletePermissiondata = request.query.code
        var sql = 'DELETE FROM Permission WHERE _id = ' + deletePermissiondata;
        let deletePermissionResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Permission deletion")
        reply.send(err.message)
    }
}

module.exports={
    getPermissions,upsertPermissions,deletePermission
}