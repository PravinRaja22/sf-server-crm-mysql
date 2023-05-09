const { executeQuery } = require('../../db/mySql')
const lookupDeals = async (request, reply) => {
    if (!request.query.searchKey) {
        try {
            console.log("inside lead lookup ");
            var sql = "select _id,opportunityName from deals limit 5";
            let getOpportunitydata = await executeQuery(sql, [])
            let opportunityName = [];
            getOpportunitydata.forEach(element => {
                opportunityName.push({
                    opportunityName: element.opportunityName,
                    id: element._id
                })
            });
            reply.send(opportunityName)
        }
        catch (err) {
            console.log("inside lead loop up error page");
            reply.send(err.message)
        }
    }
    else if (request.query.searchKey) {
        console.log("inside else if lookup enquery");
        console.log(request.query.searchKey);
        try {
            console.log("inside lead lookup with searchkey");
            var sql = "select _id,opportunityName from deals WHERE opportunityName like '%" + request.query.searchKey + "%'";
            let getOpportunitydata = await executeQuery(sql, [])
            let opportunityName = [];
            let leadName =[{}]
            getOpportunitydata.forEach(element => {
                leadName.push({
                    opportunityName: element.opportunityName,
                    id: element._id
                })
            });
            reply.send(opportunityName)
        }
        catch (err) {
            console.log("inside lead loop up error page");
            reply.send(err.message)
        }
    }
}
module.exports = { lookupDeals }