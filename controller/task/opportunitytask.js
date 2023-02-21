const { executeQuery } = require('../../db/mySql')

const opportunityTask = async (request, reply) => {


    console.log("inside opportunity with Task");
    console.log(request.query.searchId);

    try {
        var sql = "select a.*from task a, deals b where b._id= a.OpportunityId and a.OpportunityId = " + request.query.searchId;
        let getopportunityTask = await executeQuery(sql, [])

        console.log(getopportunityTask);
        reply.send(getopportunityTask)

    }
    catch (err) {
        console.log('error in opportunity task get')
        reply.send(err.message)

    }

}
module.exports = { opportunityTask }