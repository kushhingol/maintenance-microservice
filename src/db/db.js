const mysql = require('mysql');
const dbConfig = require("./dbConfig");


const db = mysql.createConnection(dbConfig);


db.connect(err => {
    if(err) {
        console.log('Failed to connect to db', JSON.stringify(err))
    } else {
        console.log('Database connected');
    }
    
})


module.exports = db;