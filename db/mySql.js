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
  console.log(arrayparams)
  // let successCount =0
  // let errorCount=0
  // arrayparams.forEach(element => {
  //   console.log("inside array params");
   
  //   for (let [key, value] of Object.entries(element)) {
  //     if (key == 'closeDate') {
  //       if (!isNaN(element)) {
  //         successCount++
  //         console.log(value);
  //       }
  //       else if (isNaN(element)) {
  //         console.log("isNan");
  //         errorCount++;
  //         console.log(value);

  //       }
  //     }
      
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
   // console.log("success count is  "+successCount + " and error count is : "+errorCount);

    //  console.log("success Count is : "+successcount );
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrayparams, (err, data) => {


        if (err) {
          console.log("error executing the query : " + err.message)
          return (err)
        }
        else {        
          resolve(data)
        }
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