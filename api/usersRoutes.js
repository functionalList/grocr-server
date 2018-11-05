const pool = require('../db')
const router = require('express')()


//SQL TIP: This is a findOrCreate
router.post('/',(req,res,next)=>{
  
  const username = req.body.username;

  const findOrCreateUser = `Insert ignore into users (name) values (?) ; Select * from users where name = ? Limit 1`

  pool.query(findOrCreateUser, [username, username], (err, results)=>{
    if(err) next(err)
    else {
      res.json(results)
    }
  })
})
module.exports=router

//follow Someone
router.post('/follow/:creatorName',(req,res,next)=>{

  const follow = `Insert into following Select ?, ID from users where name = ?`

  pool.query(follow, [req.body.followerId, req.params.creatorName], (err, results)=>{
    if(err) next(err)
    else{
      res.sendStatus(200)
    }
  })
})

//get people you follow
router.get('/friends/:userId', (req,res,next)=>{

  const userId = req.params.userId

  const seeFriends = `Select users.* from following
  join users on users.id = following.creatorId
  where following.followerid = ?`

  pool.query(seeFriends, [userId], (err, results)=>{
    if(err) next(err)
    else{
      res.json(results)
    }
  })
})

//get recipes you follow
router.get('/recipes/:userId', (req,res,next)=>{

  const userId = req.params.userId

  const getRecipes = `Select recipes.* from users
  join following on following.followerId = users.id
  join recipes on recipes.creatorID = following.creatorID
  where users.id = ?`

  pool.query(getRecipes, [userId], (err, results)=>{
    if(err) next(error)
    else{
      console.log(results)
      res.json(results)
    }
  })
})