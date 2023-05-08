const { executeQuery } = require('../../db/mySql.js')
const getRole = async (request, reply) => {
    try {
        console.log(request.body)
        if (request.body) {
            if (request.body.departmentName && request.body.role == null) {
                console.log("inside if")
                console.log("inside if of departmentName")
                var sql = "select _id,roleName from role where departmentName like '%" + request.body.departmentName + "%'";
                var getRolerecords = await executeQuery(sql, [])
                console.log(getRolerecords)
                reply.send(getRolerecords)
            }

            else if (request.body.departmentName && request.body.role != null) {
                console.log("inside else if of role and department name")
                console.log("inside else if lookup Account");
                console.log(request.body.role);
                try {
                    console.log("inside Account lookup with searchkey");
                    var sql = "select _id,roleName from role where departmentName like '%" + request.body.departmentName + "%' and roleName  like '%" + request.body.role + "%'";
                    let getRoledata = await executeQuery(sql, [])
                    console.log(getRoledata)
                    reply.send(getRoledata)
                }
                catch (err) {
                    console.log("inside Account lookup error page");
                    reply.send(err.message)
                }
            }
        }

        else {
            console.log("inside else")
            var sql = "select * from role ";
            var getRolerecords = await executeQuery(sql, [])

        }
        reply.send(getRolerecords)



    } catch (error) {
        console.log("inside error in role get " + error.message)
        reply.send(error.message)
    }
}



const upsertRoles = async (request, reply) => {
    try {
        console.log("inside insert ROles");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                console.log(names[i] + ': ' + values[i])
                result[names[i]] = values[i]
            }


        }
        toObject(objdata, objvalues)
        console.log(result);
        var sql = 'REPLACE INTO role SET ?'
        let insertRole = await executeQuery(sql, result)
        console.log(insertRole)
        reply.send("Role inserted Successfully")
    }
    catch (err) {
        console.log('error in Role insertion ', err.message);
        reply.send(err.message)
    }
}

const deleteRole = async (request, reply) => {
    console.log("inside detlete Role");
    try {
        console.log('query:', request.query.code);
        let deleteRoledata = request.query.code
        var sql = 'DELETE FROM role WHERE _id = ' + deleteRoledata;
        let deleteRoleResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Role deletion")
        reply.send(err.message)
    }
}



module.exports = {
    getRole, upsertRoles, deleteRole
}
