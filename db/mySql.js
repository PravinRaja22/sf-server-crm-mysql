var mysql = require('mysql')
var pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.MYSQLUSERNAME,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE
});
pool.getConnection((err) => {
  if (err) {
    console.log('Error message is :', err.message + ' & Error Stack is : ', err.stack)
    process.exit(1);
  }
  else {
    console.log("connected to DB")
  }
})

const executeQuery = (query, arrayparams) => {
  console.log("query is : " + query);
  //console.log(arrayparams)
  let successCount = 0
  let errorCount = 0

  arrayparams.forEach(element => {

    let objfinal = []
    for (let [fieldName, value] of Object.entries(element)) {
     // console.log("fieldName is : " + fieldName);
//console.log("Value is : " + value);
      let initialcount = Object.keys(element).length
     // console.log("initial count of the object is >>>" + initialcount);
      if(!isNaN(value) || value !=null){
        console.log(fieldName);
        console.log(value);
      }
    }

    console.log("answer is ");
    console.log(objfinal);
  });
  // if(key == 'closeDate'){
  //   console.log('Key is :'+key);
  //   console.log("value is : "+value)
  //   console.log("value is not a Number: "+isNaN(value))

  // }


  // if (!isNaN(key)) {
  //   console.log("inside valid data part");
  //   successcount++
  //   console.log(obj)
  // }
  // else if (obj[value] == "NaN") {
  //   console.log("inside invalid data part");
  //   errorcount++
  //   console.log(value)

  // }
  // }

  //  console.log("success Count is : "+successcount );


  console.log("success count is  " + successCount + " and error count is : " + errorCount);
  let errorcount = 0;
  let successcount = 0;
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayparams, (err, data) => {


        if (err) {
          errorcount++;
          console.log("error executing the query : " + err.message)
          return (err)
        }
        else {
          successcount++

          resolve(data)
        }
        console.log(successcount + ' err ' + errorcount);

      })
    }
    catch (err) {
      console.log('error part :' + count++);
      console.log(err.messaage);
      reject(err)
    }
  });
}


module.exports = { executeQuery }