const {getEnquiry,insertEnquiry,deleteEnquiry} = require('../controller/enquiry')
const { getDeals, insertDeals, deleteDeals } = require('../controller/deals')
const { getInventories,insertInventories,deleteInventories} = require('../controller/inventories')
function getdatafromreact(fastify, options, done) {

    fastify.post('/leads',getEnquiry)
    fastify.post('/UpsertLead',insertEnquiry)
    fastify.post('/deleteLead',deleteEnquiry)

    fastify.post('/opportunities',getDeals)
    fastify.post('/UpsertOpportunity',insertDeals)
    fastify.post('/deleteOpportunity',deleteDeals)

    fastify.post('/Inventories',getInventories)
    fastify.post('/UpsertInventories',insertInventories)
    fastify.post('/deleteInventories',deleteInventories)
    
    done()
}

module.exports = getdatafromreact