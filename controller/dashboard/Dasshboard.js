const { executeQuery } = require('../../db/mySql');
const getDashoard = async (request, reply) => {
    try {
           console.log("inside get Dashboard");
            var sql = "select * from Dashboard";
            let getDashboardData = await executeQuery(sql, [])
            reply.send(getDashboardData)
    
    }
    catch (err) {
        console.log('error in Dashboard get')
        reply.send(err.message)
    }
}
const upsertDashboard = async (request, reply) => {
    try {
        console.log("inside insert Dashboard");
        console.log(request.body);
        let objdata = Object.keys(request.body);
        let objvalues = Object.values(request.body);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                    result[names[i]] = values[i]
                }
            }
        
        toObject(objdata, objvalues)
        console.log(result);
        var sql = 'REPLACE INTO Dashboard SET ?'
        let insertDashboard = await executeQuery(sql, result)
        console.log(insertDashboard)
        reply.send("Dashboard inserted Successfully")
    }
    catch (err) {
        console.log('error in Dashboard insertion ');
        reply.send(err.message)
    }
}
const deleteDashboard = async (request, reply) => {
    console.log("inside detlete Dashboard");
    try {
        console.log('query : ', request.query.code);
        let deleteDashboarddata = request.query.code
        var sql = 'DELETE FROM Dashboard WHERE _id = ' + deleteDashboarddata;
        let deleteDashboardResult = await executeQuery(sql, [])
        reply.send("Dashboard Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Dashboard deletion")
        reply.send(err.message)
    }
}

const dashboardGroup = async(request,reply)=>{
    try {
        console.log('query : ', request.query);
        let {object,field}= request.query
        console.log(object)
        console.log(field)
      //  const groupBy = field.join(', ');
        var sql = `select ${field},count(*) as count FROM ${object} GROUP BY ${field}`
        let resultData = await executeQuery(sql, []);
        reply.send(resultData);
    } catch (error) {
        console.log("inside dashboard Group")
        reply.send(error.message)
    }
}
module.exports = { getDashoard, upsertDashboard, deleteDashboard,dashboardGroup }