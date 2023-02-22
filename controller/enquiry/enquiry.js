const { executeQuery } = require('../../db/mySql')
const getEnquiry = async (request, reply) => {
    console.log("inside get Enquiry");
    console.log(request.body)
    try {
        var sql = "select * from enquiry";
        let getEnquirydata = await executeQuery(sql, [])
        reply.send(getEnquirydata)
    }
    catch (err) {
        console.log("error in enquiry get");
        reply.send(err.message)
    }
}

const upsertEnquiry = async (request, reply) => {
    try {
        console.log("inside insert Enquiry");
        console.log("test enquiry ");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)     
                if (names[i] != 'propertyCities') {      
                    result[names[i]] = values[i]   
                }            
               
        }
        toObject(objdata, objvalues)
        console.log(result);
        var sql = 'REPLACE INTO enquiry SET ?'
        let insertEnquiry = await executeQuery(sql, result)
        console.log(insertEnquiry)
        reply.send("Enquiry inserted Successfully")
    }
    catch (err) {
        console.log('error in Enquiry insertion ');
        reply.send(err.message)
    }
}

const deleteEnquiry = async (request, reply) => {
    console.log("inside detlete lead");
    try {
        console.log('query:', request.query.code);
        let deleteEnquirydata = request.query.code
        var sql = 'DELETE FROM enquiry WHERE _id = ' + deleteEnquirydata;
        let deleteEnquiryResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Enquiry deletion")
        reply.send(err.message)
    }
}
module.exports = { getEnquiry, upsertEnquiry, deleteEnquiry }