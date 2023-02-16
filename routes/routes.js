const { getEnquiry, insertEnquiry, deleteEnquiry } = require('../controller/enquiry/enquiry')
const { getDeals, insertDeals, deleteDeals } = require('../controller/deals/deals')
const { getInventories, insertInventories, deleteInventories } = require('../controller/inventory/inventories')
const { getContact, insertContact, deleteContact } = require('../controller/contact/contact')
const { getAccount, insertAccount, deleteAccount } = require('../controller/Account/account.js')
const { getTask, insertTask, deleteTask, updateTask } = require('../controller/task/task')
const { fileUpload, Multer } = require('../uploader/multer')
const { insertFile } = require('../controller/fileupload/fileupload')
const { genaratePreview, dataloaderaccount, dataloaderdeals, dataloaderEnquiry } = require('../controller/dataLoader/dataloader')

function getdatafromreact(fastify, options, done) {

    fastify.post('/leads', getEnquiry)
    fastify.post('/UpsertLead', insertEnquiry)
    fastify.post('/deleteLead', deleteEnquiry)

    fastify.post('/opportunities', getDeals)
    fastify.post('/UpsertOpportunity', insertDeals)
    fastify.post('/deleteOpportunity', deleteDeals)

    fastify.post('/inventories', getInventories)
    fastify.post('/UpsertInventory', insertInventories)
    fastify.post('/deleteInventory', deleteInventories)

    fastify.post('/contacts', getContact)
    fastify.post('/UpsertContact', insertContact)
    fastify.post('/deleteContact', deleteContact)

    fastify.post('/accounts', getAccount)
    fastify.post('/UpsertAccount', insertAccount)
    fastify.post('/deleteAccount', deleteAccount)

    fastify.post('/Task', getTask)
    fastify.post('/InsertTask', insertTask)
    fastify.post('/deleteTask', deleteTask)
    fastify.post('/UpdateTask', updateTask)


    fastify.post('/uploadfile', { preHandler: fileUpload }, insertFile)
    fastify.post('/generatePreview', { preHandler: fileUpload }, genaratePreview)
    fastify.post('/dataloaderAccount', { preHandler: fileUpload }, dataloaderaccount)
    fastify.post('/dataloaderOpportunity', { preHandler: fileUpload }, dataloaderdeals)
    fastify.post('/dataloaderlead', { preHandler: fileUpload }, dataloaderEnquiry)





    done()
}

module.exports = getdatafromreact









