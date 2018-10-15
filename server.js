const app = require('express')()
const groceriesRoutes = require('./groceriesRoutes')
const pool = require('./db')
const PORT = 1337
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(require('morgan')('dev'))

app.use('/groceries', groceriesRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.listen(PORT)

// connection.connect(err=>{
//   if (err) throw err;
  
// })

