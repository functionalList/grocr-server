const pool = require('../db')
const router = require('express')()

router.get('/',(req, res, next)=>{
  const sql = `Select recipes.name as 'recipeName', GROUP_CONCAT(items.name) as 'ingredients' from recipes 
  join recipeLists on recipes.id = recipeLists.recipeID
  join items on items.id = recipeLists.itemID 
  where recipes.creatorID = ?
  group by recipes.id`

  pool.query(sql, [1], (err, results)=>{
    if(err) next(err)
    else {
      console.log('recip ', results)
      res.json(results)
    }
  })
})

module.exports = router