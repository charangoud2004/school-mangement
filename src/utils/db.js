const mysql = require('mysql2/promise');

require('dotenv').config(); 

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,  
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log("Connected to Railway MySQL");
    conn.release(); 
  })
  .catch(err => {
    console.error("MySQL Connection Error:", err);
  });

module.exports = pool;
