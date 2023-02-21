const { executeQuery } = require('../../db/mySql')
const enquirywithdeals = async (request, reply) => {
    console.log("inside enquiry with deals lookup");
    console.log(request.query.searchId);
    try {
        var sql = "select b.* from enquiry a, deals b where a._id= b.leadId and a._id = " + request.query.searchId;
        let getEnquiresdata = await executeQuery(sql, [])
        console.log(getEnquiresdata);
        getEnquiresdata.forEach(elements => {
            elements.leadDetails ={
                id:elements.leadId,
                leadName:elements.leadName
            }
            element.inventoryDetails = {
                id:element.InventoryId,
                propertyName : element.InventoryName
            }
        })
        reply.send(getEnquiresdata)
    }
    catch (err) {
        console.log('error in enquiry with deals lookup get')
        reply.send(err.message)
    }
}
module.exports = { enquirywithdeals }