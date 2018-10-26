const pool = require('../db')
const router = require('express')()


//SQL TIP: This is a findOrCreate
router.post('/',(req,res,next)=>{
  
  const username = req.body.username;

  const findOrCreateUser = `Insert ignore into users (name) values (?) ; Select * from users where name = ?`

  pool.query(findOrCreateUser, [username, username], (err, results)=>{
    if(err) next(err)
    else {
      res.json(results)
    }
  })
})
module.exports=router

//follow Someone
router.post('/follow/:creatorId',(req,res,next)=>{

  const follow = `Insert into following values (?)`

  pool.query(follow, [[1, req.params.creatorId]], (err, results)=>{
    if(err) next(err)
    else{
      res.sendStatus(200)
    }
  })
})

//get recipes you follow
router.get('/friends', (req,res,next)=>{

  const getRecipes = `Select recipes.* from users
  join following on following.followerId = users.id
  join recipes on recipes.creatorID = following.creatorID
  where users.id = ?`

  pool.query(getRecipes, [1], (err, results)=>{
    if(err) next(error)
    else{
      console.log(results)
      res.json(results)
    }
  })
})