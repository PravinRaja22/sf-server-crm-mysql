const { getEnquiry, upsertEnquiry, deleteEnquiry} = require('../controller/enquiry/enquiry')
const { getDeals, upsertDeals, deleteDeals } = require('../controller/deals/deals')
const { getInventories, upsertInventories, deleteInventories } = require('../controller/inventory/inventories')
const { getContact, upsertContact, deleteContact } = require('../controller/contact/contact')
const { getAccount, upsertAccount, deleteAccount } = require('../controller/Account/account.js')
const { getEvent, upsertEvent, deleteEvent } = require('../controller/event/event')
const { fileUpload, Multer } = require('../uploader/multer')
const { getFiles, upsertFiles, deleteFiles } = require('../controller/fileupload/fileupload')
const { genaratePreview, dataloaderaccount, dataloaderdeals, dataloaderEnquiry } = require('../controller/dataLoader/dataloader')
const { sendEmail } = require('../Email/sendemail')
const { lookupEnquiry } = require('../controller/enquiry/lookupenquiry')
const { lookupInventory } = require('../controller/inventory/lookupInventory')
const { lookupDeals } = require('../controller/deals/lookupDeals')
const { lookupAccount } = require('../controller/Account/lookupAccount')
const { enquirywithdeals } = require('../controller/deals/dealsWithenquiry')
const { leadEvent } = require('../controller/event/leadEvent')
const { opportunityEvent } = require('../controller/event/opportunityevent')
const { accountEvent } = require('../controller/event/accountEvent')
const { inventorywithdeals } = require('../controller/deals/dealwithinventory')
const { Inventorywithaccount } = require('../controller/Account/accountInventory')
const { accountsContact } = require('../controller/Account/accountContacts')
const { getPicklistvalue, getPicklistname } = require('../controller/picklist/picklist')
const { getUser, upsertUsers, deleteUser, getSingleUser, getSignUpPageUser } = require('../controller/user/user')
const { otpEmail } = require('../controller/Email/otpEmail')
const { getTabs }=require('../controller/Tabs/getTabs')
const { getRole,upsertRoles,deleteRole } = require('../controller/roles/role')
const { getPermissions,upsertPermissions,deletePermission,sendRolePermission}=  require('../controller/permission/permission')
const { getAllTable} = require ('../controller/showTable/table.js')
const { checkAccess } = require('../controller/authorization/checkAccess')
const { getFields } = require('../controller/fields/getFields')
const { getDashoard,upsertDashboard, deleteDashboard, dashboardGroup } = require('../controller/dashboard/Dasshboard')
function getdatafromreact(fastify, options, done) {

fastify.post("/generateOTP", otpEmail)
fastify.post("/checkAccess", checkAccess)

fastify.post('/signin',getSingleUser)
fastify.post('/signup',upsertUsers )

fastify.post('/UpsertUser',upsertUsers)
fastify.post('/delete',deleteUser)
fastify.post('/Users',getUser)
fastify.post('/checkSignUpUser',getSignUpPageUser)
fastify.post('/sendRolePermission',sendRolePermission)

fastify.post ('/getObject',getAllTable)
fastify.post ('/getTabs',getTabs)
fastify.post('/getFields/:object',getFields)

fastify.post('/roles',getRole)
fastify.post('/upsertRole',upsertRoles)
fastify.post('/deleteRole',deleteRole)

fastify.post('/files',getFiles)
fastify.post('/upsertfiles',upsertFiles)
fastify.post('/deletefiles',deleteFiles)

fastify.post('/getPermissions',getPermissions)
fastify.post('/upsertPermission',upsertPermissions)
fastify.post('/deletePermission',deletePermission)

fastify.get('/',async(request,reply)=>{
reply.send("testpage")
})

fastify.post('/leads', getEnquiry)
fastify.post('/UpsertLead', upsertEnquiry)
fastify.post('/deleteLead', deleteEnquiry)
fastify.post('/LeadsbyName', lookupEnquiry)
fastify.post('/getLeadsbyOppid', enquirywithdeals)
fastify.post('/getTaskbyLeadId',leadEvent)

fastify.post('/opportunities', getDeals)
fastify.post('/UpsertOpportunity', upsertDeals)
fastify.post('/deleteOpportunity', deleteDeals)
fastify.post('/opportunitiesbyName', lookupDeals)
fastify.post('/getTaskbyOpportunityId', opportunityEvent)

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
fastify.post('/getTaskbyAccountId', accountEvent)
fastify.post('/getAccountbyInventory', Inventorywithaccount)

fastify.post('/Task', getEvent)
fastify.post('/UpsertTask', upsertEvent)
fastify.post('/deleteTask', deleteEvent)

fastify.post('/dashboard',getDashoard)
fastify.post('/upsertDashboard',upsertDashboard)
fastify.post('/deleteDashboard/:id',deleteDashboard)
fastify.post('/dashboardGroup',dashboardGroup)



fastify.post('/uploadfile', { preHandler: fileUpload }, upsertFiles)
fastify.post('/generatePreview', { preHandler: fileUpload }, genaratePreview)
fastify.post('/dataloaderAccount', { preHandler: fileUpload }, dataloaderaccount)
fastify.post('/dataloaderOpportunity', { preHandler: fileUpload }, dataloaderdeals)
fastify.post('/dataloaderlead', {spreHandler: fileUpload }, dataloaderEnquiry)
fastify.post('/bulkemail', { preHandler: fileUpload }, sendEmail)

fastify.post('/getpicklistcountry', getPicklistname)
fastify.post('/getpickliststate', getPicklistvalue)
done()
}
module.exports = getdatafromreact