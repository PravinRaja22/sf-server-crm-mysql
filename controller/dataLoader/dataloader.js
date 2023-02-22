const { executeQuery } = require('../../db/mySql')
const csvtojson = require('csvtojson')
const genaratePreview = async (request, reply) => {
    try {
        console.log("inside generate preview");
        const files = request.file.filename
        console.log("Preview files");
        const csvfilepath = 'uploads/' + files
        console.log("csvfile accounts : " + csvfilepath);
        await csvtojson()
            .fromFile(csvfilepath)
            .then((jsonobj) => {
                console.log(jsonobj);
                reply.send(jsonobj)
            })
    } catch (error) {
        console.log("error in generate preview page");
        reply.send(error.message)

    }
}

const dataloaderaccount = async (request, reply) => {
    try {
        const files = request.file.filename
        console.log("Account data loader");
        const csvfilepath = 'uploads/' + files
        console.log("csvfile accounts : " + csvfilepath);

        await csvtojson()
            .fromFile(csvfilepath)
            .then((jsonobj) => {
                console.log("inside dataloader for account below is result");
                console.log(jsonobj);
                console.log("inside insert Account");
                let d = new Date();
                const formarDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':')
                //console.log(formarDate);
                var someDate = new Date(formarDate);
                console.log("someDate : ", someDate) //getting error like Invalid Date
                someDate1 = someDate.getTime();
                console.log("someDate : ", someDate1)
                jsonobj.forEach((variable) => {
                    variable.createdDate = someDate1;
                    variable.modifiedDate = someDate1
                })
                console.log(jsonobj);

                let objvalues = Object.values(jsonobj);
                let objdata = Object.keys(jsonobj);
                let result = [{}];
                console.log("keys are : " + objdata);
                function toObject(names, values) {
                    for (let i = 0; i < names.length; i++)
                        if (names[i] != '_id') {
                            result[names[i]] = values[i]
                        }
                    console.log(result);
                }
                toObject(objdata, objvalues)
                var sql = 'INSERT INTO Account SET ?'
                console.log(result);
                result.forEach(element => {
                    let insertAccount = executeQuery(sql, element)
                    reply.send("Account Inserted Successfully")
                });
            })

    } catch (error) {
        console.log("error in account data loader");
        reply.send(error.message)
    }
}

const dataloaderdeals = async (request, reply) => {
    try {
        const files = request.file.filename
        console.log("deals data loader");
        const csvfilepath = 'uploads/' + files
        console.log("csvfile deals : " + csvfilepath);
        await csvtojson()
            .fromFile(csvfilepath)
            .then((jsonobj) => {
                console.log("inside dataloader for deals below is result");
                console.log(jsonobj);
                console.log("inside insert deals dataloader");
                let d = new Date();
                const formarDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':')
                var someDate = new Date(formarDate);
                console.log("someDate : ", someDate) //getting error like Invalid Date
                someDate1 = someDate.getTime();
                console.log("someDate : ", someDate1)
                jsonobj.forEach((variable) => {
                    variable.createdDate = someDate1;
                    variable.modifiedDate = someDate1;
                    if(variable.closeDate){
                        console.log('closed date is : '+variable.closeDate);
                        let d = new Date(variable.closeDate);
                        const closedatefromat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':')
                        var epochtime = new Date(closedatefromat);
                        console.log("someDate : ", epochtime) //getting error like Invalid Date
                        epochtime1 = epochtime.getTime();
                        console.log("someDate : ", epochtime1);
                        variable.closeDate=epochtime1;
                    }

                })
                console.log(jsonobj);
                let objvalues = Object.values(jsonobj);
                let objdata = Object.keys(jsonobj);
                let result = [{}];
                console.log("keys are : " + objdata);
                function toObject(names, values) {
                    for (let i = 0; i < names.length; i++)
                        if (names[i] != '_id') {
                            result[names[i]] = values[i]
                        }
                    console.log(result);
                }
                toObject(objdata, objvalues)
                var sql = 'INSERT INTO deals SET ?'
                console.log('size of the result is : '+result.length);
                let count=0;
                let insertAccount =  executeQuery(sql, result)
                console.log(insertAccount);
                // result.forEach(element  => {
                //     count++
                //     console.log("count inside the forloop is : "+count);
                //     let insertAccount =  executeQuery(sql, element)
                //     console.log(insertAccount);
                //     reply.send("Deals Inserted Successfully")
                // });
            })
    } catch (error) {
        console.log("error in deals data loader");
        reply.send(error.message)
    }
}
const dataloaderEnquiry = async (request, reply) => {
    try {
        const files = request.file.filename
        console.log("Enquiry data loader");
        const csvfilepath = 'uploads/' + files
        console.log("csvfile enquiry : " + csvfilepath);
        await csvtojson()
            .fromFile(csvfilepath)
            .then((jsonobj) => {
                console.log("inside dataloader for enquiry below is result");
                console.log(jsonobj);
                console.log("inside insert enquiry dataloader");
                let d = new Date();
                const formarDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':')
                //console.log(formarDate);
                var someDate = new Date(formarDate);
                console.log("someDate : ", someDate) //getting error like Invalid Date
                someDate1 = someDate.getTime();
                console.log("someDate : ", someDate1)
                jsonobj.forEach((variable) => {
                    variable.createdDate = someDate1;
                    variable.modifiedDate = someDate1
                    if (variable.firstName && variable.lastName ) {
                        variable.fullName = variable.firstName + ' ' + variable.lastName
                    }
                    else if(variable.firstName){
                        variable.fullName = variable.firstName
                    }
                })
                console.log(jsonobj);
                let objvalues = Object.values(jsonobj);
                let objdata = Object.keys(jsonobj);
                let result = [{}];
                console.log("keys are : " + objdata);
                function toObject(names, values) {
                    for (let i = 0; i < names.length; i++)
                        if (names[i] != '_id') {
                            result[names[i]] = values[i]
                        }
                    console.log(result);
                }
                toObject(objdata, objvalues)
                var sql = 'INSERT INTO enquiry SET ?'
                console.log(result);
                result.forEach(element => {
                    let insertEnquiry =executeQuery(sql, element)
                    console.log(insertEnquiry);
                    reply.send("Enquiry Inserted Successfully")
                });
            })
    } catch (error) {
        reply.send(error.message)
    }
}
module.exports = { genaratePreview, dataloaderaccount, dataloaderdeals, dataloaderEnquiry }