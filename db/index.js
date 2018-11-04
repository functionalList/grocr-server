const mysql = require('mysql')
require('../secrets.js')

const dbConfig = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: process.env.MYSQLPASS,
  database: process.env.DBNAME || "grocr",
  multipleStatements: true,
  connectionLimit : 10,
}

module.exports = mysql.createPool(dbConfig);




