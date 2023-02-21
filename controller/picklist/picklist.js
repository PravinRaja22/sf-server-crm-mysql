const { executeQuery } = require('../../db/mySql')
const getPicklistvalue = async (request, reply) => {
    try {
        console.log("inside picklist get ");
        var sql = "select * from picklist where  fieldName = " + request.query.data
        let getpicklistdata = await executeQuery(sql, [])
        reply.send(getpicklistdata)

    } catch (error) {
        console.log("inside picklist get error");
        reply.send(error.message)

    }
}

const getPicklistname = async (request, reply) => {
    try {
        console.log("inside picklist get ");
        var sql = "select fieldName from picklist "
        let getpicklistdata = await executeQuery(sql, [])

        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }

        const arr2 = getUniqueListBy(getpicklistdata, 'fieldName')
        let uniqueValue = JSON.stringify(arr2)
        reply.send(uniqueValue)

    } catch (error) {
        console.log("inside picklist get error");
        reply.send(error.message)

    }
}



module.exports = { getPicklistvalue, getPicklistname }