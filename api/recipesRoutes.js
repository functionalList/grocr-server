const pool = require('../db')
const router = require('express')()

router.get('/:userId',(req, res, next)=>{
  const sql = `Select recipes.name as 'recipeName', GROUP_CONCAT(items.name) as 'ingredients' from recipes 
  join recipeLists on recipes.id = recipeLists.recipeID
  join items on items.id = recipeLists.itemID 
  where recipes.creatorID = ?
  group by recipes.id`

  pool.query(sql, [req.params.userId], (err, results)=>{
    if(err) next(err)
    else {
      console.log('recip ', results)
      res.json(results)
    }
  })
})

router.post('/', (req,res,next)=>{

  const createNewRecipe = `Insert into recipes (name, creatorID) values (?,?)`

  //Insert into recipeLists (recipeID, itemID) values (@recipe, productID);

  const q = pool.query(createNewRecipe, ['lasagne', 2], (err, results)=>{
    if(err) next(err)
    else {
      
      const RECIPE_ID = results.insertId
      
      const insertItems = `Insert ignore into items (name) values ?`
      
      pool.query(insertItems, [[['san marzano'], ['ricotta']]], (err, results) =>{
        if(err) next(err)
        else {

          const populateAssociation = `Insert into recipeLists(recipeID, itemID) Select ?, ID from items where name in (?)`
          pool.query(populateAssociation, [ RECIPE_ID ,['san marzano', 'ricotta']], (err,results)=>{
            
            if(err) next(err)
            else res.json(results)
          })
        }
      }) 
    }
  } )
  
})
module.exports = router