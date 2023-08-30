const { executeQuery } = require('../../db/mySql')
const { hashValidator, hashGenerate } = require('../../helpers/hashing')
const { tokenGenerator } = require('../../helpers/jwttoken')

const getUser = async (request, reply) => {

    try {
        console.log("inside get users");
        var sql = "select * from user";
        console.log("sql is "+sql);
        let results = await executeQuery(sql, [])
        reply.send(results)
    } catch (error) {

        console.log("inside catch block ", error.message);
        reply.send(error.message)

    }


}


const upsertUsers = async (request, reply) => {
    try {
        console.log("inside insert Users");
        console.log("test User ");
        console.log(request.body);
    
        const hashedPassword = await hashGenerate(request.body.password)
        console.log("hashed password is " + hashedPassword);
        request.body.password = hashedPassword
        console.log(request.body.password)
        console.log(request.body)
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                console.log(names[i]+': '+values[i])
                result[names[i]] = values[i]
            }


        }
        toObject(objdata, objvalues)
        console.log(result);
        result.fullName = result.firstName+' '+result.lastName;
        console.log(result ,' After Full Name is ')
        var sql = 'REPLACE INTO user SET ?'
        let insertUser = await executeQuery(sql, result)
        console.log(insertUser)
        reply.send("User inserted Successfully")
    }
    catch (err) {
        console.log('error in User insertion ', err.message);
        reply.send(err.message)
    }
}

const deleteUser = async (request, reply) => {
    console.log("inside detlete user");
    try {
        console.log('query:', request.query.code);
        let deleteUserdata = request.query.code
        var sql = 'DELETE FROM user WHERE _id = ' + deleteUserdata;
        let deleteUserResult = await executeQuery(sql, [])
        reply.send("Data Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Enquiry deletion")
        reply.send(err.message)
    }
}



async function getSingleUser(request, reply) {
    console.log('inside get single User is ' + request);
    try {
        let sql = "select * from User where userName like '%"+request.body.userName+"%'";
        let existingUser = await executeQuery(sql, []);
        console.log(existingUser)
        if (!existingUser) {
            console.log("inside not the existing user");
            reply.send({
                status: "failure",
                content: "password or UserName in Wrong.Please Enter correct Details "
            })

        }

        else {
            console.log("isnide else of the get single user ",request.body)
            console.log(existingUser[0].password)
            let checkkpassword = await hashValidator(request.body.password, existingUser[0].password)
            console.log("checking password is "+checkkpassword)
            if (!checkkpassword) {
                reply.send({
                    status: "failure",
                    content: "Password or UserName is Wrong.Please Enter correct Details"
                })
            }
            else {
                console.log("inside password is correct")
                const token = await tokenGenerator(existingUser.userName)
                console.log("jwt token", token)
                reply.header('set-cookie', token);
                console.log(reply.header)
                reply.send({
                    status: "success",
                    content: token,
                    userDetails: existingUser
                })
            }

        }

    }
    catch (e) {
        console.error(e);
    }
}




async function getSignUpPageUser(request, reply) {

    try {
        let sql = "select * from User where userName like '%"+request.body.userName+"%'";
        let result = await executeQuery(sql, []);
        if (!result) {
            console.log("inside not existing User");
            reply.send({ status: "failure", content: "No User available with the given userName" });
        }
        else {
            reply.send({ status: "success", content: result })
        }
    }
    catch (e) {
        console.error(e);
    }
}
module.exports = { getUser, upsertUsers, deleteUser, getSingleUser, getSignUpPageUser }