const { executeQuery } = require('../../db/mySql')
const inventorywithdeals = async (request, reply) => {
    console.log("inside inventory with deals lookup");
    console.log(request.query.searchId);
    try {
       // var sql = "select * from deals a, inventory b where a.InventoryId= b._id and b._id = " + request.query.searchId;
        var sql = "select *,a._id from deals a, inventory b where a.InventoryId= b._id and b._id = "+ request.query.searchId;

        let getDealsdata = await executeQuery(sql, [])
        console.log(getDealsdata);
        reply.send(getDealsdata)
    }
    catch (err) {
        console.log('error in inventory with deals lookup get')
        reply.send(err.message)
    }
}
module.exports = { inventorywithdeals }