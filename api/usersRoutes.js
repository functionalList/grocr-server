const pool = require('../db')
const router = require('express')()

router.post('/',(req,res,next)=>{
  
  const username = req.body.username;
  const sql = `SELECT * FROM users WHERE name = ?`;
  pool.query(sql, [username], (err, results)=>{
    if(err) next(err)
    else{
      console.log('what does this look like ?', results)
      if (!results.length) {
        const sql = `INSERT INTO users (name) VALUES (?)`;
        pool.query(sql, [username], (err, results)=>{
          if(err) next(err)
          else{
            console.log('what does this look like ?', results.insertId)
            res.json({id: results.insertId})
          }
        })
      } else {
        res.json(results)
      }
    }
  })

})
module.exports=router