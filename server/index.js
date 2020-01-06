const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// our localhost port
const port = 4001

const app = express()

const gameRoutes = require('./routes/game')
const userRoutes = require('./routes/user')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(gameRoutes)
app.use(userRoutes)

mongoose.connect('mongodb+srv://Nattan:nattan@othello-sagnv.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(result => {
    const server = app.listen(port)
    const io = require('./socket').init(server)
    io.on('connection', socket => {
      console.log('New client connected')
      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  })
  .catch(err =>
    console.log(err)
  )
