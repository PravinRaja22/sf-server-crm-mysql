const { executeQuery } = require('../../db/mySql')
const accountTask = async (request, reply) => {
    console.log("inside Account with Task");
    console.log(request.query.searchId);
    try {
        var sql = "select * from task a, account b where b._id= a.AccountId and a.AccountId = " + request.query.searchId;
        let accountTasks = await executeQuery(sql, [])
        console.log(accountTasks);
        reply.send(accountTasks);
    }
    catch (err) {
        console.log('error in Account task get')
        reply.send(err.message)
    }
}
module.exports = { accountTask }