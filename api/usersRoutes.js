const pool = require('../db')
const router = require('express')()


//SQL TIP: This is a findOrCreate
router.post('/',(req,res,next)=>{
  
  const username = req.body.username;

  const findOrCreateUser = `Insert ignore into users (name) values (?) Select * from users where name = ?`

  pool.query(findOrCreateUser, [username], (err, results)=>{
    if(err) next(err)
    else {
      res.json(results)
    }
  })
})
module.exports=router