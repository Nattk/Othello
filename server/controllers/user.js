const User = require('../models/user')

exports.postUser = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const user = new User({ username: username, password: password })
  user.save().then(user => {
    res.send(user._id)
  }).catch(err => console.log(err))
}

exports.logUser = (req, res, next) => {
  const username = req.body.username
  User.findOne({ username: username })
    .then(user => {
      res.send(user._id)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getUser = (req, res, next) => {
  const id = req.params.id
  User.findById(id).then(user => {
    res.send(user.username)
  }).catch(err => console.log(err))
}
