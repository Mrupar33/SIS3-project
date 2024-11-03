const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost', // or 'localhost' based on your setup
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Adjust based on your needs
  queueLimit: 0
});

conn.connect((err) => {
    if(err){
        console.log("ERROR: " + err.message);
        return;    
    }
    console.log('Connection established');
  })


module.exports = pool.promise();
