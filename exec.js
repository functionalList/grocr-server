const mysql = require('mysql')
const execsql = require('execsql')

const dbConfig = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "petermark",
  database: "grocr"
}

const connection = mysql.createConnection(dbConfig);

connection.connect(err=>{
  if (err) throw err;
  connection.query("INSERT INTO items (name) VALUES ('carrot')")
  const sql = "SELECT * FROM items"
  connection.query(sql, (err, result)=>{
    console.log(result)
  })
  connection.end()
})



// const exec = execsql.config(dbConfig)

// exec.execFile(__dirname + '/groceriesTable.sql', res=>{
//   console.log(res)
// }).end()

