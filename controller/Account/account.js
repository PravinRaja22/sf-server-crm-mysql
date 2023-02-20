const { executeQuery } = require('../../db/mySql')
const getAccount = async (request, reply) => {
    console.log("inside get Account");
    console.log(request.body)
    try {
        var sql = "select * from Account";
        let getAccountdata = await executeQuery(sql, [])
        reply.send(getAccountdata)

    }
    catch (err) {
        console.log('error in Accounts get')
        reply.send(err.message)

    }

}

const insertAccount = async (request, reply) => {
    try {
        console.log("inside insert Account");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
            {
                if (names[i] != 'propertyCities') {             
                    result[names[i]] = values[i]
                }
            }  
        }
        toObject(objdata, objvalues)

        console.log(result);

        var sql = 'REPLACE INTO Account SET ?'
        // var values = {
        //     salutation: request.body.salutation,
        //     firstname: request.body.firstName,
        //     Phone: request.body.phone,
        // }
       // console.log(values);

        let insertAccount = await executeQuery(sql, result)
        console.log(insertAccount)
        reply.send("Account inserted Successfully")
    }
    catch (err) {
        console.log('error in Account insertion ');
        reply.send(err.message)
    }

}

const deleteAccount = async (request, reply) => {
    console.log("inside detlete Account");
    try {
        console.log('query:', request.query.code);
        let deleteAccountdata = request.query.code
        var sql = 'DELETE FROM Account WHERE _id = ' + deleteAccountdata;
        let deleteAccountResult = await executeQuery(sql, [])
        reply.send("Account Deleted Successfully")

    }

    catch (err) {
        console.log("error happenend in Account deletion")
        reply.send(err.message)
    }
}


const updateAccount = async (request,reply)=>{
    try{
   console.log('inside update account')

    }
    catch(e){

    }
}


module.exports = { getAccount, insertAccount, deleteAccount }