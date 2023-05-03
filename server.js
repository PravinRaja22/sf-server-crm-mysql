const fastify = require('fastify')({logger :false})
const port = 4500;
const path = require('path')
const dotenv = require("dotenv").config();

fastify.register(require('@fastify/static'),{
    root:path.join(__dirname,'./uploads')
})
fastify.register(require('@fastify/formbody'));

const Multer = require('fastify-multer');

console.log(path.join(__dirname,'./uploads'));

fastify.register(Multer.contentParser);

fastify.register(require('./routes/routes'),{
    prefix:'/api'
})

fastify.register(require('@fastify/cors'))

const start = async ()=>{
    try{
    await  fastify.listen({port})
        console.log("connected to port "+port);
    }
    catch(e){
        console.log(e.message);
    }
}
start()