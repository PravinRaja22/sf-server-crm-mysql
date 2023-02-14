const { executeQuery } = require('../config/mySql')
const getEnquiry = async (request, reply) => {
    console.log("inside get lead");
    console.log(request.body)
    try {
        var sql = "select * from enquiry";
        let getEnquirydata = await executeQuery(sql, [])
        reply.send(getEnquirydata)

    }
    catch (err) {
        reply.send(err.message)

    }

}

const insertEnquiry = async (request, reply) => {
    try {
        console.log("inside insert lead");
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

        var sql = 'REPLACE INTO enquiry SET ?'
        var values = {
            salutation: request.body.salutation,
            firstname: request.body.firstName,
            Phone: request.body.phone,
        }
        console.log(values);

        let insertEnquiry = await executeQuery(sql, result)
        console.log(insertEnquiry)
        reply.send("Data inserted Successfully")
    }
    catch (err) {
        console.log(err.message);
        reply.send(err.message)
    }

}

const deleteEnquiry = async (request, reply) => {
    console.log("inside detlete lead");
    try {
        console.log('query:', request.query.code);
        let deleteLeaddata = request.query.code
        var sql = 'DELETE FROM enquiry WHERE _id = ' + deleteLeaddata;
        let deleteLeadResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in lead deletion")
        reply.send(err.message)
    }
}
module.exports = { getEnquiry, insertEnquiry, deleteEnquiry }