const { executeQuery } = require('../../db/mySql')
const leadTask = async (request, reply) => {
    console.log("inside lead with Task");
    console.log(request.query.searchId);
    try {
        var sql = "select a.* from task a, enquiry b where b._id= a.leadId and a.leadId = " + request.query.searchId;
        let leadsTasks = await executeQuery(sql, [])
        console.log(leadsTasks);
        leadsTasks.forEach(e =>{
            e.leadDetails ={
                id:e.leadId,
                leadName:e.leadName
            }
        })
        reply.send(leadsTasks)
    }
    catch (err) {
        console.log('error in deals get')
        reply.send(err.message)
    }
}
module.exports = { leadTask }