const mysql = require('mysql2') // npm i mysql2
mysql.escape();
if (process.env.DEV_DB_HOST) {
  const pool = mysql.createPool({
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    charset : 'utf8mb4',
    namedPlaceholders: true,
    connectionLimit: 10
  });
  
  const promisePool = pool.promise();
  module.exports = promisePool;
} else {
  module.exports = null;
}