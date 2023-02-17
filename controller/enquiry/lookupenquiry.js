const { executeQuery } = require('../../db/mySql')
const lookupEnquiry = async (request, reply) => {
    if (!request.query.searchKey) {
        try {
            console.log("inside enquiry lookup ");
            var sql = "select _id,fullName from enquiry limit 5";
            let getEnquirydata = await executeQuery(sql, [])
            let leadName = [];
            getEnquirydata.forEach(element => {
                leadName.push({
                    leadName: element.fullName,
                    id: element._id
                })
            });
            reply.send(leadName)
        }
        catch (err) {
            console.log("inside Enquiry lookup error page");
            reply.send(err.message)
        }
    }
    else if (request.query.searchKey) {
        console.log("inside else if lookup enquiry");
        console.log(request.query.searchKey);
        try {
            console.log("inside lead lookup with searchkey");
            var sql = "select _id,fullName from enquiry WHERE fullName like '%" + request.query.searchKey + "%'";
            let getEnquirydata = await executeQuery(sql, [])
            let leadName = [];
            getEnquirydata.forEach(element => {
                leadName.push({
                    leadName: element.fullName,
                    id: element._id
                })
            });
            reply.send(leadName)

        }
        catch (err) {
            console.log("inside Enquiry lookup error page");
            reply.send(err.message)
        }
    }
}
module.exports = { lookupEnquiry }