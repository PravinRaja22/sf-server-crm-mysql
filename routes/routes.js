const {getEnquiry,insertEnquiry,deleteEnquiry} = require('../controller/enquiry')
const { getDeals, insertDeals, deleteDeals } = require('../controller/deals')
const { getInventories,insertInventories,deleteInventories} = require('../controller/inventories')
const {getContact,insertContact,deleteContact} = require('../controller/contact')
const { getAccount, insertAccount, deleteAccount } = require ('../controller/account.js')
const {getTask,insertTask,deleteTask,updateTask} = require('../controller/task')
const {fileupload,Multer} = require('../fileuploader/multer')
const { insertFile } = require('../controller/fileupload')
function getdatafromreact(fastify, options, done) {

    fastify.post('/leads',getEnquiry)
    fastify.post('/UpsertLead',insertEnquiry)
    fastify.post('/deleteLead',deleteEnquiry)

    fastify.post('/opportunities',getDeals)
    fastify.post('/UpsertOpportunity',insertDeals)
    fastify.post('/deleteOpportunity',deleteDeals)

    fastify.post('/inventories',getInventories)
    fastify.post('/UpsertInventory',insertInventories)
    fastify.post('/deleteInventory',deleteInventories)
  
    fastify.post('/contacts',getContact)
    fastify.post('/UpsertContact',insertContact)
    fastify.post('/deleteContact',deleteContact)

    fastify.post('/accounts',getAccount)
    fastify.post('/UpsertAccount',insertAccount)
    fastify.post('/deleteAccount',deleteAccount)

    fastify.post('/Task',getTask)
    fastify.post('/InsertTask',insertTask)
    fastify.post('/deleteTask',deleteTask)
    fastify.post('/UpdateTask',updateTask)


    fastify.post('/uploadfile',{preHandler:fileupload},insertFile)

    
    done()
}

module.exports = getdatafromreact









