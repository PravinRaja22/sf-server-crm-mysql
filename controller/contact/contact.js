const { executeQuery } = require('../../db/mySql')
const getContact = async (request, reply) => {
    console.log("inside get contact");
    console.log(request.body)
    try {
        var sql = "select * from contact";
        let getContactdata = await executeQuery(sql, [])
        console.log(getContactdata);
        getContactdata.forEach(element => {
            //we are adding below object to send a response to user interface
            element.accountDetails = {
                accountName: element.AccountName,
                id: element.AccountId
            }

        });
        reply.send(getContactdata)

    }
    catch (err) {
        console.log('error in contact get')
        reply.send(err.message)

    }

}

const insertContact = async (request, reply) => {
    try {
        console.log("inside insert contact");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
             if (names[i] != 'accountDetails') {
                {
                    result[names[i]] = values[i]

                }
              }
            console.log(result);
        }
        toObject(objdata, objvalues)
        var sql = 'REPLACE INTO contact SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
       // console.log(values);

        let insertContact = await executeQuery(sql, result)
        console.log(insertContact)


        reply.send("Contact inserted Successfully")
    }
    catch (err) {
        console.log('error in Contact insertion ');
        reply.send(err.message)
    }

}

const deleteContact = async (request, reply) => {
    console.log("inside delete Contact");
    try {
        console.log('query:', request.query.code);
        let deleteContactdata = request.query.code
        var sql = 'DELETE FROM contact WHERE _id = ' + deleteContactdata;
        let deleteContactResult = await executeQuery(sql, [])
        reply.send("Contact Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in Contact deletion")
        reply.send(err.message)
    }
}
module.exports = {getContact,insertContact,deleteContact}