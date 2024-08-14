const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "user_auth",
});

module.exports = pool.promise();
