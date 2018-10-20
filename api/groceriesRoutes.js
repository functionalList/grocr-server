const pool = require('../db')
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

//SQL TIP: This is an UPSERT
router.post('/',(req,res,next)=>{



  

  const sql = `Insert ignore into items (name) values ?; SET @item = LAST_INSERT_ID(); Insert Into userPurchases (itemID, userID) values (@item, ?)
  On Duplicate Key Update
    total=total+1;`
  const values = req.body.data.map(eachItem=>{
    return [eachItem.name]
  })

  const retry = `Insert ignore into items (name) values ?; Insert Into userPurchases (itemID, userID) Select ID, ? from items where name = ?`

  const variables = [values, 1, [req.body.data]]

  pool.query(sql, [values, 1], (err, results)=>{
    if(err) next(err)
    else{
      res.json(results)
    }
  })

})

module.exports=router
