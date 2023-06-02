const { executeQuery } = require('../../db/mySql');
const getFiles = async (request, reply) => {
    try {
           console.log("inside get File");
            var sql = "select * from File";
            let getfileData = await executeQuery(sql, [])
            reply.send(getfileData)
    
    }
    catch (err) {
        console.log('error in file get')
        reply.send(err.message)
    }
}
const upsertFiles = async (request, reply) => {
    try {
        console.log("inside insert Files");
     console.log(request.file);

        console.log(request.body.createdDate)
      


        console.log(request.protocol + '://' + request.headers.host + '/'+request.file.filename);



let objfile = {
    fileName:request.file.originalname,
    mimetype:request.file.mimetype,
    fileUrl:request.protocol + '://' + request.headers.host + '/'+request.file.filename,
    createdDate:request.body.createdDate,
    modifiedDate:request.body.modifiedDate,
    createdBy:request.body.createdBy,
    modifiedBy:request.body.modifiedBy,
    relatedTo:request.body.relatedTo,
    size:request.file.size
}



        let objdata = Object.keys(objfile);
        let objvalues = Object.values(objfile);
        let result = {};
        console.log("keys are : " + objdata);
        async function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                    result[names[i]] = values[i]
                }
            }
        
        toObject(objdata, objvalues)
        console.log(result);
        var sql = 'REPLACE INTO File SET ?'
        let insertFile = await executeQuery(sql,result)
        console.log(insertFile)
        reply.send("File inserted Successfully")
    }
    catch (err) {
        console.log('error in File insertion ');
        reply.send(err.message)
    }d
}
const deleteFiles = async (request, reply) => {
    console.log("inside detlete Files");
    try {
        console.log('query : ', request.params.id);
        let deleteFiledata = request.params.id
        var sql = 'DELETE FROM File WHERE _id = ' + deleteFiledata;
        let deleteDashboardResult = await executeQuery(sql, [])
        reply.send("File Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in File deletion")
        reply.send(err.message)
    }
}

module.exports = { getFiles, upsertFiles, deleteFiles }







































// const insertFile = (request,reply)=>{

//     try{


// console.log("inside file uploader function");
// console.log(request.file);
// reply.send(request.protocol+'://'+request.headers.host+'/'+request.file.filename)


//     }
//     catch(err){
//         console.log("inside file insert error : ",err.message);
//         reply.send(err.message)
//     }

// }


// module.exports ={insertFile}