const { executeQuery } = require('../../db/mySql')
const getEvent = async (request, reply) => {
    console.log("inside get Task");
    console.log(request.body)
    try {
        var sql = "select * from event";
        let geteventdata = await executeQuery(sql, [])
        geteventdata.forEach(e => {
            if (e.leadId && e.leadName) {
                e.leadDetails = {
                    id: e.leadId,
                    leadName: e.leadName
                }
            }



            else if (e.accountId && e.accountName) {

                e.accountDetails = {
                    id: e.accountId,
                    accountName: e.accountName
                }
            }
            else if (e.opportunityId && e.opportunityName) {
                e.opportunityDetails = {
                    id: e.opportunityId,
                    opportunityName: e.opportunityName
                }
            }
        })
        reply.send(geteventdata)

    }
    catch (err) {
        console.log('error in event get')
        reply.send(err.message)

    }

}

const upsertEvent = async (request, reply) => {
    try {
        console.log("inside insert Event");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != 'leadDetails' && names[i] != 'accountDetails' && names[i] != 'opportunityDetails') {
                    result[names[i]] = values[i]
                    console.log(result);
                }
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO event SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
        // console.log(values);

        let insertevnet = await executeQuery(sql, result)
        if(insertevnet){
            reply.send("Data inserted Successfully")
        }
        else{
            reply.send("Data Not Inserted")
        }

    }
    catch (err) {
        console.log('error in inventory insertion ');
        reply.send(err.message)
    }

}

const deleteEvent = async (request, reply) => {
    console.log("inside delete Task");
    try {
        console.log('query:', request.query.code);
        let deleteEventdata = request.query.code
        var sql = 'DELETE FROM event WHERE _id = ' + deleteEventdata;
        let deleteEventResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in Event deletion: ", err.message)
        reply.send(err.message)
    }
}


module.exports = { getEvent, upsertEvent, deleteEvent }