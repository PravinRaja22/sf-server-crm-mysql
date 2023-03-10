const { executeQuery } = require('../../db/mySql')
const getInventories = async (request, reply) => {
    console.log("inside get Inventory");
    console.log(request.body)
    try {
        var sql = "select * from Inventory";
        let getInventorydata = await executeQuery(sql, [])
        reply.send(getInventorydata)

    }
    catch (err) {
        console.log('error in inventories get')
        reply.send(err.message)

    }

}

const upsertInventories = async (request, reply) => {
    try {
        console.log("inside insert Inventories");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != 'propertyCities') {
                    result[names[i]] = values[i]
                }
            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO Inventory SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
       // console.log(values);

        let insertInventory = await executeQuery(sql, result)
        console.log(insertInventory)
        console.log(insertInventory)
        console.log(insertInventory)

        reply.send("Data inserted Successfully")
    }
    catch (err) {
        console.log('error in inventory insertion ');
        reply.send(err.message)
    }

}

const deleteInventories = async (request, reply) => {
    console.log("inside delete Inventories");
    try {
        console.log('query:', request.query.code);
        let deleteInventorydata = request.query.code
        var sql = 'DELETE FROM Inventory WHERE _id = ' + deleteInventorydata;
        let deleteInventoriesResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in inventory deletion: ",err.message)
        reply.send(err.message)
    }
}
module.exports = {getInventories,upsertInventories,deleteInventories}