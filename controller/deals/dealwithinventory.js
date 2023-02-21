const { executeQuery } = require('../../db/mySql')
const inventorywithdeals = async (request, reply) => {
    console.log("inside inventory with deals lookup");
    console.log(request.query.searchId);
    try {
        // var sql = "select * from deals a, inventory b where a.InventoryId= b._id and b._id = " + request.query.searchId;
        var sql = "select a.* from deals a, inventory b where a.InventoryId= b._id and b._id = " + request.query.searchId;

        let getDealsdata = await executeQuery(sql, [])
        console.log(getDealsdata);
        getDealsdata.forEach(element => {
            console.log(element.modifiedDate)

            element.inventoryDetails = {
                id:element.InventoryId,
                propertyName : element.InventoryName
            }
            element.leadDetails = {
                id:element.leadId,
                leadName : element.leadName
            }
            console.log("modified Date");
            console.log(element.modifiedDate)
        })
        reply.send(getDealsdata)
    }
    catch (err) {
        console.log('error in inventory with deals lookup get')
        reply.send(err.message)
    }
}
module.exports = { inventorywithdeals }