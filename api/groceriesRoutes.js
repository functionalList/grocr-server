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
    total=total+1;` //older query we were using

  const values = req.body.groceries.map(eachItem=>{
    return [eachItem.name]
  })

  const userId = req.body.userId

  const userPurchasesItems = `Insert ignore into items (name) values ?; Insert Into userPurchases (itemID, userID) Select ID, ? from items where name in ? On Duplicate Key Update
  total=total+1;`

  const variables = [values, userId, [req.body.groceries]]

  pool.query(userPurchasesItems, variables, (err, results)=>{
    if(err) next(err)
    else{
      res.json(results)
    }
  })
})

module.exports=router
