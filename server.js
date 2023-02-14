const fastify = require('fastify')({logger :false})
const port = 4500;
const dotenv = require("dotenv").config();
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