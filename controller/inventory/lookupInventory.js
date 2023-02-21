const { executeQuery } = require('../../db/mySql')
const lookupInventory = async (request, reply) => {
    console.log(request.body);
    if (!request.query.searchKey) {
        try {
            console.log("inside inventory lookup ");
            var sql = "select _id,propertyName from Inventory limit 5";
            let inventoryName =[]

            let getInventorydata = await executeQuery(sql, [])
            getInventorydata.forEach(element =>{
                propertyName.push({
                    inventoryName: element.propertyName,
                    id: element._id
                })

            })
            
            reply.send(inventoryName)
        }
        catch (err) {
            console.log("inside inventory loopup error page");
            reply.send(err.message)
        }
    }
       else if (request.query.searchKey) {
            try {

                console.log("inside inventory lookup ");
                var sql = "select _id,propertyName from Inventory  WHERE propertyName like '%" + request.query.searchKey + "%'";
                let getInventorydata = await executeQuery(sql, [])
                let inventoryName =[]
                getInventorydata.forEach(element =>{
                    propertyName.push({
                        inventoryName: element.propertyName,
                        id: element._id
                    })

                })
                reply.send(inventoryName)

            }
            catch (err) {
                console.log("inside inventory loopup error page");
                reply.send(err.message)

            }
        }
    
}
module.exports = { lookupInventory }