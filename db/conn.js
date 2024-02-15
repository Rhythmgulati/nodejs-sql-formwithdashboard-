const mysql = require("mysql");

var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"student"
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected to MySql database");
});

module.exports = db;