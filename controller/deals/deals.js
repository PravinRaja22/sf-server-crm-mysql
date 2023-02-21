const { executeQuery } = require('../../db/mySql')
const getDeals = async (request, reply) => {
    console.log("inside get deals");
    console.log(request.body)
    try {
        var sql = "select * from Deals";
        let getDealsdata = await executeQuery(sql, [])
        getDealsdata.forEach(element => {
            //adding new object to specify id and name in a single set(used to display the data in the userinterface)
            element.inventoryDetails =
                {
                InventoryId: element.InventoryId,
                propertyName: element.InventoryName,
                },
            element.leadDetails =
                {
                leadId: element.leadId,
                leadName: element.leadName,
                }
        });


        console.log(getDealsdata);
        reply.send(getDealsdata)
    }
    catch (err) {
        console.log('error in deals get')
        reply.send(err.message)
    }
}

const insertDeals = async (request, reply) => {
    try {
        console.log("inside insert Deals");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                console.log(names);
                //since both the inventory details and lead details are object  we coudn't able to save this in mysql database
                //so we are eliminating both of object when inserting in the db
                if (names[i] != 'inventoryDetails' && names[i] != 'leadDetails') {
                    result[names[i]] = values[i]

                }
            }
            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO Deals SET ?'
        let insertDeals = await executeQuery(sql, result)
        console.log(insertDeals)
        reply.send("Deals inserted Successfully")
    }
    catch (err) {
        console.log('error in deals insertion ');
        reply.send(err.message)
    }
}

const deleteDeals = async (request, reply) => {
    console.log("inside detlete Deals");
    try {
        console.log('query:', request.query.code);
        let deleteDealsdata = request.query.code
        //deleteing the record based on record id
        var sql = 'DELETE FROM Deals WHERE _id = ' + deleteDealsdata;
        let deleteDealsResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Deals deletion")
        reply.send(err.message)
    }
}
module.exports = { getDeals, insertDeals, deleteDeals }