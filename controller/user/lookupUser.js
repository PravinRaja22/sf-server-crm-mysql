const { executeQuery } = require('../../db/mySql')
const lookupUser = async (request, reply) => {
    if (!request.query.searchKey) {
        try {
            console.log("inside user lookup ");
            var sql = "select _id,fullName from User limit 5";
            let getUserdata = await executeQuery(sql, [])
            let userName = [];
            getUserdata.forEach(element => {
                console.log(element)
                userName.push({
                    id: element._id,
                    userName: element.fullName
                })
            });
            reply.send(userName)
        }
        catch (err) {
            console.log("inside user lookup error page");
            reply.send(err.message)
        }
    }
    else if (request.query.searchKey) {
        console.log("inside else if lookup user");
        console.log(request.query.searchKey);
        try {
            console.log("inside lead lookup with searchkey");
            var sql = "select _id,fullName from User WHERE fullName like '%" + request.query.searchKey + "%'";
            let getUserdata = await executeQuery(sql, [])
            let userName = [];
            getUserdata.forEach(element => {
                userName.push({
                    userName: element.fullName,
                    id: element._id
                })
            });
            reply.send(userName)

        }
        catch (err) {
            console.log("inside User lookup error page");
            reply.send(err.message)
        }
    }
}
module.exports = { lookupUser }