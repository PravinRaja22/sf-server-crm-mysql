const insertFile = (request,reply)=>{

    try{


console.log("inside file uploader function");
console.log(request.file);
reply.send(request.protocol+'://'+request.headers.host+'/'+request.file.filename)


    }
    catch(err){
        console.log("inside file insert error : ",err.message);
        reply.send(err.message)
    }

}


module.exports ={insertFile}