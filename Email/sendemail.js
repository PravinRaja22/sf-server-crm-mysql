const nodemailer = require('nodemailer')
const path = require('path');
const { insertEmail } = require('../controller/Email/insertEmail');
async function sendEmail(request, reply) {

    try {
        console.log("Before Bulk email list is ");
        console.log(request.body);
        console.log("after bulk  email list is ");
        let subject = request.body.subject;
        let content = request.body.htmlBody;
        let toEmailId = request.body.emailId
        console.log('Email id is : ' + toEmailId);
        console.log('Subject is : ' + subject);
        console.log('Body is : ' + content);
        if (!request.file) {
            console.log("else of file name");
            details = {
                to: toEmailId,
                subject: subject,
                text: content,
            }
        }
        else if (request.file.filename) {
            console.log("inside file name");
            let attachmentname = request.file.filename
            console.log('file name  is : ' + attachmentname);
            const filepath = path.join(__dirname, '../uploads/' + attachmentname)
            console.log("File Path is : " + filepath)
            details = {
                to: toEmailId,
                subject: subject,
                text: content,
                attachments: [
                    { filename: attachmentname, path: filepath }
                ]
            }
        }

        let mailtransporter = nodemailer.createTransport({
            service: process.env.GMAIL,
            auth: {
                user: process.env.FORMEMAILID,
                pass: process.env.PASSWORD,
            }
        })

        mailtransporter.sendMail(details, async (err) => {
            if (err) {
                console.log("inside if");
                console.log(err.message);
                return err.message;
            }
            else {
                console.log("inside else of node mailer");
                let insertEmaildata = await insertEmail(request.body)
                console.log("above insert Email data");
                console.log(insertEmaildata);
               await  reply.send("Email sent successfully")
                
            }
        })
    } catch (error) {
        console.log('error in email send ');
        reply.send(error.message)
    }

};
module.exports = { sendEmail }




