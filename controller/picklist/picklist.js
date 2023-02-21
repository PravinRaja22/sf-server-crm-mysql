const { executeQuery } = require('../../db/mySql')
const getPicklistvalue = async (request, reply) => {
    try {
        console.log("inside picklist get ");
        console.log(request.query.data);
        console.log(request.query.table);
      //  var sql = "select * from picklist where  fieldName = " + request.query.data+" and tableName = "+request.query.tablename
        let sql = 'SELECT * FROM picklist WHERE fieldName = ? AND tableName = ?';
       // let sql = 'SELECT * FROM picklist';

        let values = [request.query.data, request.query.table]
        let getpicklistdata = await executeQuery(sql,values)
        reply.send(getpicklistdata)
    } catch (error) {
        console.log("inside picklist get error");
        reply.send(error.message)
    }
}

const getPicklistname = async (request, reply) => {
    try {
        console.log("inside picklist get ");
        var sql = "select fieldName,tableName from picklist "
        let getpicklistdata = await executeQuery(sql, [])
        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        const arr2 = getUniqueListBy(getpicklistdata, 'fieldName')
        let uniqueValue = arr2

        reply.send(uniqueValue)
    } catch (error) {
        console.log("inside picklist get error");
        reply.send(error.message)

    }
}



module.exports = { getPicklistvalue, getPicklistname }