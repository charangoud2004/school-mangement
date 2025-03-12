const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 60000,
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

  pool.query("SHOW DATABASES")
  .then(([rows]) => {
    console.log("✅ Available Databases:", rows);
  })
  .catch(err => {
    console.error("❌ Error fetching databases:", err);
  });



module.exports = pool;
