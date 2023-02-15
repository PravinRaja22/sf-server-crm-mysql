const { executeQuery } = require('../config/mySql')
const getDeals = async (request, reply) => {
    console.log("inside get deals");
    console.log(request.body)
    try {
        var sql = "select * from Deals";
        let getEnquirydata = await executeQuery(sql, [])
        reply.send(getEnquirydata)

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
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i]
                }
            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO Deals SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
       // console.log(values);

        let insertDeals = await executeQuery(sql, result)
        console.log(insertDeals)
        reply.send("Data inserted Successfully")
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
        let deleteLeaddata = request.query.code
        var sql = 'DELETE FROM Deals WHERE _id = ' + deleteLeaddata;
        let deleteLeadResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in Deals deletion")
        reply.send(err.message)
    }
}
module.exports = { getDeals, insertDeals, deleteDeals }