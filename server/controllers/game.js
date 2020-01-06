const Game = require('../models/game')
const User = require('../models/user')
const io = require('../socket')

exports.postGame = (req, res, next) => {
  const gameBoard = req.body.gameBoard
  const userId = req.body.userId
  const game = new Game({ gameBoard: gameBoard, isPlaying: '1', scoreWhite: '2', scoreBlack: '2', createdBy: userId })
  game.save()
    .then(game => {
      res.send(game._id)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getGame = (req, res, next) => {
  const id = req.params.id
  Game.findById(id).populate({ path: 'createdBy', model: User }).populate({ path: 'guest', model: User })
    .then(game => {
      console.log('connecté')
      io.getIo().of(`/${game._id}`)
        .emit('connected', game)
      res.send(game)
    })
    .catch(err => console.log(err))
}

exports.updateGame = (req, res, next) => {
  const id = req.body.id
  const gameBoard = req.body.gameBoard
  const isPlaying = req.body.isPlaying
  Game.findById(id)
    .then(game => {
      game.gameBoard = gameBoard
      game.isPlaying = isPlaying
      return game.save()
    })
    .then(game => {
      io.getIo().of(`/${game._id}`)
        .emit('updateGame', game)
    })
    .catch(err => console.log(err))
}

exports.passGame = (req, res, next) => {
  const id = req.body.id
  const isPlaying = req.body.isPlaying
  Game.findById(id)
    .then(game => {
      game.isPlaying = isPlaying
      return game.save()
    })
    .then(game => {
      io.getIo().of(`/${game._id}`)
        .emit('updateGame', game)
    })
    .catch(err => console.log(err))
}
exports.addGuest = (req, res, next) => {
  const idGuest = req.body.idGuest
  const idGame = req.body.idGame

  Game.findById(idGame)
    .then(game => {
      game.guest = idGuest
      return game.save()
    })
    .then(game => {
      io.getIo().of(`/${idGame}`)
        .emit('guest', game.guest)
      res.send(game)
    })
    .catch(err => console.log(err))
}

exports.getGames = (req, res, next) => {
  Game.find()
    .populate({ path: 'createdBy', model: User })
    .then(games => {
      res.send(games)
    })
    .catch(err => console.log(err))
}
