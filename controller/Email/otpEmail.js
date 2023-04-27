const {otpVerification} = require('../../Email/otpverificationgmail')
let generatedotp;

const otpEmail =async (request,reply)=>{
    try {

        console.log("initial value of generatedotp is "+generatedotp)
        if (!request.body.otp) {
            console.log("inside generate otp")
            generatedotp = Math.floor(1000 + Math.random() * 9000);
            console.log("otp is " + generatedotp)
            let emailresult = await otpVerification(request, generatedotp);
            console.log(emailresult)
            reply.send("OTP sent Successfuly")

        }
        else if (request.body.otp) {

            console.log("else if  value of generatedotp is "+generatedotp)

            if (request.body.otp == generatedotp) {
                console.log("inside otp is correct")
                console.log("inputted otp is " + request.body.otp)
                console.log("genrated otp is " + generatedotp)
                reply.send({ status: "success", content: "Entered otp is correct" })
            }
            else {
                console.log("inside otp is incorrect")
                console.log("inputted otp is " + request.body.otp)
                console.log("genrated otp is " + generatedotp)
                reply.send({ status: "failure", content: "please enter correct OTP" })
            }

        }

    } catch (error) {
        console.log("inside  generate otp error page")
        reply.send(error.message)

    }


}

module.exports ={otpEmail}