const { executeQuery } = require('../../db/mySql')

const opportunityEvent = async (request, reply) => {


    console.log("inside opportunity with Event");
    console.log(request.query.searchId);

    try {
        var sql = "select a.* from event a, deals b where b._id= a.OpportunityId and a.OpportunityId = " + request.query.searchId;
        let getopportunityEvent = await executeQuery(sql, [])

        console.log(getopportunityEvent);
        getopportunityEvent.forEach(e =>{
            e.opportunityDetails ={
                id:e.opportunityId,
                opportunityName:e.opportunityName
            }
        })
        reply.send(getopportunityEvent)

    }
    catch (err) {
        console.log('error in opportunity event get')
        reply.send(err.message)

    }

}
module.exports = { opportunityEvent }