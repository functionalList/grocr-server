const mysql = require('mysql')
require('../secrets.js')

const dbConfig = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: process.env.MYSQLPASS,
  database: "grocr",
  multipleStatements: true,
  connectionLimit : 10,
}

module.exports = mysql.createPool(dbConfig);

//const sqlQuery = "DROP TABLE items; DROP TABLE users; CREATE TABLE items (ID int, name VARCHAR(255), PRIMARY KEY (ID));CREATE TABLE users (ID int, name VARCHAR(255, PRIMARY KEY (ID)));"



