const pool = require('./db')
const router = require('express')()

router.get('/',(req,res,next)=>{

  const sql = `Select * from items`

  const query = pool.query(sql, (err,results)=>{

    if(err) next(err)
    else {
      res.json(results)
    }
  })

})

router.post('/',(req,res,next)=>{
  console.log('hoi ', req.body)
  
  const sql = `Insert ignore into items (name) values ?`
  const values = req.body.data.map(eachItem=>{
    return [eachItem.name]
  })
  pool.query(sql, [values], (err, results)=>{
    if(err) next(err)
    else{
      console.log('what does this look like ?', results)
      res.json(results)
    }
  })

})

module.exports=router
