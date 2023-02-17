const nodemailer = require('nodemailer')
const path = require('path')
async function sendEmail(request) {
    console.log("Before Bulk email list is ");
   // console.log(request);
    console.log("after bulk  email list is ");
    let subject = request.body.subject;
    let Body = request.body.htmlBody;
    let emailId=request.body.emailId
    console.log('Email id is : '+emailId);
    console.log('Subject is : ' + subject);
    console.log('Body is : ' + Body);

    if(!request.file){
        console.log("else of file name");
            details = {
                to:emailId,
                subject: subject,
                text: Body,
            }
}
   else if(request.file.filename){
        console.log("inside file name");
            let attachmentname = request.file.filename
            console.log('file name  is : ' + attachmentname);
            const filepath = path.join(__dirname, '../uploads/' + attachmentname)
            console.log("File Path is : " + filepath)
                details = {
                    to:emailId,
                    subject: subject,
                    text: Body,
                    attachments: [
                        {filename:attachmentname, path: filepath }
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

        mailtransporter.sendMail(details, (err) => {
            if (err) {
                console.log("inside if");
                console.log(err.message);
                return err.message;
            }
            else {
                console.log("inside else of node mailer");
                return "Email sent successfully";
            }
        })
    };
    module.exports = { sendEmail }




