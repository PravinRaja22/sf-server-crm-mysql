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

const insertEnquiry = async (request, reply) => {
    try {
        console.log("inside insert lead");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        if(request.body._id){
            console.log("inside if condition for id");
            async function toObject(names, values) {
                for (let i = 0; i < names.length; i++)
                {
                    result[names[i]] = values[i]
                }                   
                console.log(result);
            }
            toObject(objdata, objvalues)
            var sql = 'REPLACE INTO enquiry SET ?'
            let insertEnquiry = await executeQuery(sql, result)
            console.log(insertEnquiry)
            reply.send("Enquiry updated Successfully")
        }
        else if(!request.body._id){
            console.log("inside else if condition for id");
            async function toObject(names, values) {
                for (let i = 0; i < names.length; i++){
                    result[names[i]] = values[i]
                }              
                console.log(result);
            }
            toObject(objdata, objvalues)
            var sql = 'REPLACE INTO enquiry SET ?'
            let insertEnquiry = await executeQuery(sql, result)
            console.log(insertEnquiry)
            reply.send("Enquiry inserted Successfully")
        }    
    }
    catch (err) {
        console.log('error in insert enquiry');
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
module.exports = { getEnquiry, insertEnquiry, deleteEnquiry }