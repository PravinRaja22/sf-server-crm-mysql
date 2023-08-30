const { executeQuery } = require('../../db/mySql')
const leadEvent = async (request, reply) => {
    console.log("inside lead with event");
    console.log(request.query.searchId);
    try {
        var sql = "select a.* from event a, enquiry b where b._id= a.leadId and a.leadId = " + request.query.searchId;
        let leadsEvents = await executeQuery(sql, [])
        console.log(leadsEvents);
        leadsEvents.forEach(e =>{
            e.leadDetails ={
                id:e.leadId,
                leadName:e.leadName
            }
        })
        reply.send(leadsEvents)
    }
    catch (err) {
        console.log('error in lead event get')
        reply.send(err.message)
    }
}
module.exports = { leadEvent }