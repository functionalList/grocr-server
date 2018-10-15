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
  res.send(req.body)
})

module.exports=router
