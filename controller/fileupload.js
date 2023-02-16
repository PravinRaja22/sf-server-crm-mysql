const insertFile = (request,reply)=>{

    try{


console.log("inside file uploader function");
console.log(request.file);


    }
    catch(err){
        console.log("inside file insert error : ",err.message);
        reply.send(err.message)
    }

}


module.exports ={insertFile}