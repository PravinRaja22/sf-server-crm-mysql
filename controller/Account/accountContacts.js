const { executeQuery } = require('../../db/mySql')
const accountsContact = async (request, reply) => {
    console.log("inside Account with Contacts lookup");
    console.log(request.query.searchId);
    try {
        var sql = "select *,a._id from contact a, account b where a.AccountId= b._id and b._id = " + request.query.searchId;
        let getaccountscontact = await executeQuery(sql, [])
        console.log(getaccountscontact);
        reply.send(getaccountscontact)
    }
    catch (err) {
        console.log('error in account contact lookup')
        reply.send(err.message)
    }
}
module.exports = { accountsContact }