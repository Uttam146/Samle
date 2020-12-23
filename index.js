const express = require('express');
const app = express();
const bodyParser= require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/Users',function (req, res){
const sql = require("mssql");
//app.listen(5000);

const config = { server: 'ReactApp.mssql.somee.com',
authentication: { type: 'default', options: { userName: 'JJTet_SQLLogin_1', password: 'v2c5ruune7' } }, options: { encrypt:false, "enableArithAbort": true } }


// const config = {
//     user: 'JJTet',
//     password: 'v2c5ruune7',
//     server: 'ReactApp.mssql.somee.com', 
//     database: 'ReactApp' ,
//     port: 1433,
//     "options": {
//         "encrypt": true,
//         "enableArithAbort": true
//     }
// };

sql.connect(config, function (err) {
    
    if (err) console.log(err);

    // create Request object
    let sqlRequest = new sql.Request();
       
    // query to the database and get the records
    let sqlQuery= 'select Id,Password as Username from Users';
     sqlRequest.query(sqlQuery, function (err, data){

        if (err) console.log(err)
     
        // console.log(data);
        // console.log(data.recordset);
        // console.log(data.rowsAffected);
        // console.log(data.recordset[0]);
        let h='<h1 style="background:red;color:whitesmoke;margin:20px;border:20px solid red;">Users Record</h1>'
        let str ='<table style="margin-left:20px;">';
        let row='';
        for(let j=0;j<data.recordset.length;j++){
            row=row+ '<tr>' + '<td style="width:150px;">' +data.recordset[j].Id+ '</td>' + '<td style="width:150px;">' +data.recordset[j].Username+ '</td>'
        }
        str =str +row + '</table>';
        res.send(h+str);
        sql.close();
        
    });
});
});
var server = app.listen(5000, function () {
console.log('Server is running..');
});



