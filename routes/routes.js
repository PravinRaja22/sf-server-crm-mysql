const { getEnquiry, upsertEnquiry, deleteEnquiry } = require('../controller/enquiry/enquiry')
const { getDeals, upsertDeals, deleteDeals } = require('../controller/deals/deals')
const { getInventories, upsertInventories, deleteInventories } = require('../controller/inventory/inventories')
const { getContact, upsertContact, deleteContact } = require('../controller/contact/contact')
const { getAccount, upsertAccount, deleteAccount } = require('../controller/Account/account.js')
const { getTask, upsertTask, deleteTask } = require('../controller/task/task')
const { fileUpload, Multer } = require('../uploader/multer')
const { insertFile } = require('../controller/fileupload/fileupload')
const { genaratePreview, dataloaderaccount, dataloaderdeals, dataloaderEnquiry } = require('../controller/dataLoader/dataloader')
const { sendEmail } = require('../Email/sendemail')
const { lookupEnquiry } = require('../controller/enquiry/lookupenquiry')
const { lookupInventory } = require('../controller/inventory/lookupInventory')
const { lookupDeals } = require('../controller/deals/lookupDeals')
const { lookupAccount } = require('../controller/Account/lookupAccount')
const { enquirywithdeals } = require('../controller/deals/dealsWithenquiry')
const { leadTask } = require('../controller/task/leadTask')
const { opportunityTask } = require('../controller/task/opportunitytask')
const { accountTask } = require('../controller/task/accounttask')
const { inventorywithdeals } = require('../controller/deals/dealwithinventory')
const { Inventorywithaccount } = require('../controller/Account/accountInventory')
const { accountsContact } = require('../controller/Account/accountContacts')
const { getPicklistvalue, getPicklistname } = require('../controller/picklist/picklist')
function getdatafromreact(fastify, options, done) {

    fastify.post('/leads', getEnquiry)
    fastify.post('/UpsertLead', upsertEnquiry)
    fastify.post('/deleteLead', deleteEnquiry)
    fastify.post('/LeadsbyName', lookupEnquiry)
    fastify.post('/getLeadsbyOppid', enquirywithdeals)
    fastify.post('/getTaskbyLeadId', leadTask)

    fastify.post('/opportunities', getDeals)
    fastify.post('/UpsertOpportunity', upsertDeals)
    fastify.post('/deleteOpportunity', deleteDeals)
    fastify.post('/opportunitiesbyName', lookupDeals)
    fastify.post('/getTaskbyOpportunityId', opportunityTask)
    fastify.post('/getOpportunitiesbyInvid', inventorywithdeals)

    fastify.post('/inventories', getInventories)
    fastify.post('/UpsertInventory', upsertInventories)
    fastify.post('/deleteInventory', deleteInventories)
    fastify.post('/InventoryName', lookupInventory)

    fastify.post('/contacts', getContact)
    fastify.post('/UpsertContact', upsertContact)
    fastify.post('/deleteContact', deleteContact)
    fastify.post('/getContactsbyAccountId', accountsContact)

    fastify.post('/accounts', getAccount)
    fastify.post('/UpsertAccount', upsertAccount)
    fastify.post('/deleteAccount', deleteAccount)
    fastify.post('/accountsname', lookupAccount)
    fastify.post('/getTaskbyAccountId', accountTask)
    fastify.post('/getAccountbyInventory', Inventorywithaccount)

    fastify.post('/Task', getTask)
    fastify.post('/UpsertTask', upsertTask)
    fastify.post('/deleteTask', deleteTask)
    // fastify.post('/UpdateTask', updateTask)

    fastify.post('/uploadfile', { preHandler: fileUpload }, insertFile)
    fastify.post('/generatePreview', { preHandler: fileUpload }, genaratePreview)
    fastify.post('/dataloaderAccount', { preHandler: fileUpload }, dataloaderaccount)
    fastify.post('/dataloaderOpportunity', { preHandler: fileUpload }, dataloaderdeals)
    fastify.post('/dataloaderlead', { preHandler: fileUpload }, dataloaderEnquiry)
    fastify.post('/bulkemail', { preHandler: fileUpload }, sendEmail)


    fastify.post('/getpicklistcountry', getPicklistname)
    fastify.post('/getpickliststate', getPicklistvalue)
    done()
}

module.exports = getdatafromreact









