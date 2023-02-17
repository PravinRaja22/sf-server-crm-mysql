const { executeQuery } = require('../../db/mySql')
const getTask = async (request, reply) => {
    console.log("inside get Task");
    console.log(request.body)
    try {
        var sql = "select * from Task";
        let getEnquirydata = await executeQuery(sql, [])
        reply.send(getEnquirydata)

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
                if (names[i] != '_id') {
                    result[names[i]] = values[i]
                }
            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'INSERT INTO Task SET ?'
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
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                //if (names[i] != '_id') {
                result[names[i]] = values[i]
            // }
            console.log(result);
        }
        toObject(objdata, objvalues)



        var sql = 'update Task set subject=?, relatedTo=?, assignedTo=?,description=?, attachments=?, object=?, LeadId=?, createdbyId=?, createdDate=?, modifiedDate=?, StartDate=?,EndDate=?, leadDetails=? where _id = ' + result._id;
        let deleteTaskResult = await executeQuery(sql, objvalues)
        reply.send("Data updated Successfully")
    }
    catch (err) {
        console.log(err.message);
        reply.send(err.message)
    }
}
module.exports = { getTask, insertTask, deleteTask, updateTask }