const pool = require('../db')
const router = require('express')()


router.get('/:userName',(req, res, next)=>{
  const getUsersRecipes = `Select recipes.name, recipes.id from users
  join recipes on recipes.creatorid = users.id
  where users.name = ?`

  pool.query(getUsersRecipes, [req.params.userName], (err, results)=>{
    if(err) next(err)
    else {
      console.log('different recipes ', results)
      res.json(results)
    }
  })
})

router.get('/:userID/:recipeID', (req, res, next)=>{
  const viewRecipe = `Select recipes.name as 'recipeName', users.name as 'creator', GROUP_CONCAT(items.name) as 'ingredients' from recipes 
  Join recipeLists on recipes.id = recipeLists.recipeID
  Join items on items.ID = recipeLists.itemID
  Join users on users.ID = recipes.creatorID
  Where recipes.creatorID = ? and recipes.ID = ?
  Group by recipes.id`

  pool.query(viewRecipe, [req.params.userID, req.params.recipeID], (err, results)=>{
    if(err) next(err)
    else {
      console.log(results)
      res.json(results)
    }
  })
})

router.post('/', (req,res,next)=>{

  const createNewRecipe = `Insert into recipes (name, creatorID) values (?,?)`

  //Insert into recipeLists (recipeID, itemID) values (@recipe, productID);

  const q = pool.query(createNewRecipe, [req.body.title, req.body.userID], (err, results)=>{
    if(err) next(err)
    else {
      
      const RECIPE_ID = results.insertId
      
      const insertItems = `Insert ignore into items (name) values ?`
      
      const formattedIngredients = req.body.ingredients.map((x,i) => [x]);

      pool.query(insertItems, [formattedIngredients], (err, results) =>{
        if(err) next(err)
        else {

          const populateAssociation = `Insert into recipeLists(recipeID, itemID) Select ?, ID from items where name in (?)`
          pool.query(populateAssociation, [ RECIPE_ID ,req.body.ingredients], (err,results)=>{
            if(err) next(err)
            else res.json({id: RECIPE_ID})
          })
        }
      }) 
    }
  } )
  
})
module.exports = router