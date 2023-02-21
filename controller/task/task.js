const { executeQuery } = require('../../db/mySql')
const getTask = async (request, reply) => {
    console.log("inside get Task");
    console.log(request.body)
    try {
        var sql = "select * from Task";
        let gettaskdata = await executeQuery(sql, [])
        gettaskdata.forEach(e => {
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
        reply.send(gettaskdata)

    }
    catch (err) {
        console.log('error in Task get')
        reply.send(err.message)

    }

}

const insertTask = async (request, reply) => {
    try {
        console.log("inside insert Task");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i]

            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO Task SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
        // console.log(values);

        let insertTask = await executeQuery(sql, result)


        reply.send("Data inserted Successfully")
    }
    catch (err) {
        console.log('error in inventory insertion ');
        reply.send(err.message)
    }

}

const deleteTask = async (request, reply) => {
    console.log("inside delete Task");
    try {
        console.log('query:', request.query.code);
        let deleteTaskdata = request.query.code
        var sql = 'DELETE FROM Task WHERE _id = ' + deleteTaskdata;
        let deleteTaskResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in Task deletion: ", err.message)
        reply.send(err.message)
    }
}

const updateTask = async (request, reply) => {
    try {
        console.log('inside update task')
        console.log("request from react js");
        console.log(request.body);
        console.log("end of request from react js");

        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
            if (names[i] != 'leadDetails' && names[i] != 'accountDetails' && names[i] != 'opportunityDetails') {
            {
                result[names[i]] = values[i]
            }
            }
            console.log("result ")
            console.log(result);
        }
        toObject(objdata, objvalues)



        var sql = 'update Task set subject=?, relatedTo=?, assignedTo=?,description=?, attachments=?, object=?, LeadId=?, createdbyId=?, createdDate=?, modifiedDate=?, StartDate=?,EndDate=?, leadDetails=? where _id = ' + result._id;
        let updatetaskkResult = await executeQuery(sql, objvalues)
        console.log("final result is : " + updatetaskkResult);
        reply.send("Data updated Successfully")
    }
    catch (err) {
        console.log(err.message);
        reply.send(err.message)
    }
}
module.exports = { getTask, insertTask, deleteTask, updateTask }