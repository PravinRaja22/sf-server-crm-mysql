const { executeQuery } = require('../../db/mySql')
const Inventorywithaccount = async (request, reply) => {
    console.log("inside inventory with accounts lookup");
    console.log(request.query.searchId);
    try {
        // var sql = "select * from deals a, inventory b where a.InventoryId= b._id and b._id = " + request.query.searchId;
        var sql = "select a.* from account a, inventory b where a.InventoryId= b._id and b._id = " + request.query.searchId;

        let getAccountsdata = await executeQuery(sql, [])
        console.log(getAccountsdata);
        getAccountsdata.forEach(element => {

            element.inventoryDetails = {
                id: element.InventoryId,
                propertyName: element.InventoryName
            }
        })
        reply.send(getAccountsdata)
    }
    catch (err) {
        console.log('error in inventory with account lookup get')
        reply.send(err.message)
    }
}
module.exports = { Inventorywithaccount }