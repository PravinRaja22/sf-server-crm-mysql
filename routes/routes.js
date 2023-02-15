const {getEnquiry,insertEnquiry,deleteEnquiry} = require('../controller/enquiry')
const { getDeals, insertDeals, deleteDeals } = require('../controller/deals')
const { getInventories,insertInventories,deleteInventories} = require('../controller/inventories')
const {getContact,insertContact,deleteContact} = require('../controller/contact')
function getdatafromreact(fastify, options, done) {

    fastify.post('/leads',getEnquiry)
    fastify.post('/UpsertLead',insertEnquiry)
    fastify.post('/deleteLead',deleteEnquiry)

    fastify.post('/opportunities',getDeals)
    fastify.post('/UpsertOpportunity',insertDeals)
    fastify.post('/deleteOpportunity',deleteDeals)

    fastify.post('/Inventories',getInventories)
    fastify.post('/UpsertInventory',insertInventories)
    fastify.post('/deleteInventories',deleteInventories)

    fastify.post('/contacts',getContact)
    fastify.post('/UpsertContact',insertContact)
    fastify.post('/deleteContact',deleteContact)
    
    done()
}
console.log("sad");
console.log("test")
module.exports = getdatafromreact









