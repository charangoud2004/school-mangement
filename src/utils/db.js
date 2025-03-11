// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config(); 

// const pool = mysql
//   .createPool(process.env.MYSQL_URL) 
//   .promise();

// pool.query("SELECT 1")
//   .then(() => console.log("Connected to Railway MySQL"))
//   .catch((err) => console.error(" MySQL Connection Error:", err));

// export default pool;

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306, // Railway MySQL uses port 3306
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

