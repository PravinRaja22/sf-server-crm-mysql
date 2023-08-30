const { executeQuery } = require('../../db/mySql')
const accountEvent = async (request, reply) => {
    console.log("inside Account with event");
    console.log(request.query.searchId);
    try {
        var sql = "select a.* from event a, account b where b._id= a.AccountId and a.AccountId = " + request.query.searchId;
        let accountEvents = await executeQuery(sql, [])
        console.log(accountEvents);

        accountEvents.forEach(e =>{
            e.accountDetails ={
                id:e.accountId,
                accountName:e.accountName
            }
        })
        reply.send(accountEvents);
    }
    catch (err) {
        console.log('error in Account event get')
        reply.send(err.message)
    }
}
module.exports = { accountEvent }