const Multer = require ('fastify-multer')
const path = require ('path')

var storage =Multer.default({
    destination:(req,file,cb)=>{
        const ROOT_PATH = __dirname
        console.log("Root Path : ",ROOT_PATH);
        console.log("directory name of path : "+path.dirname(ROOT_PATH));
        console.log("Inside destination Folder : "+JSON.stringify(file));

        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{

        cb(
            null,
            file.originalname
        )
    }
})

var upload = Multer({
    storage:storage
})

let fileupload = upload.single('file')

module.exports = {fileupload,Multer}