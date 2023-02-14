const {getEnquiry,insertEnquiry,deleteEnquiry} = require('../controller/enquiry')
function getdatafromreact(fastify, options, done) {

    fastify.post('/leads',getEnquiry)
    fastify.post('/UpsertLead',insertEnquiry)
    fastify.post('/deleteLead',deleteEnquiry)

    done()
}

module.exports = getdatafromreact