const Multer = require('fastify-multer')
const path = require('path')
var storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("inside multer");
        const ROOT_PATH = __dirname
        console.log("Root path " + ROOT_PATH);
        console.log("directory name of path ", path.dirname(ROOT_PATH))
        console.log("inside destination folder " + JSON.stringify(file));
       // cb(null, path.dirname(ROOT_PATH))
        cb(null,'uploads')
    },
    filename: (req, file, cb) => {
        console.log("inside multer");
        cb(
            null,
            file.originalname
        );
    }
})

var upload = Multer({
    storage: storage,
    
})

let fileUpload = upload.single('file')



module.exports={
    fileUpload,Multer
}


