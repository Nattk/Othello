const express = require('express')

const gameController = require('../controllers/game')

const router = express.Router()

router.post('/add-game', gameController.postGame)
router.get('/get-games', gameController.getGames)
router.get('/get-game/:id', gameController.getGame)
router.put('/update-game', gameController.updateGame)
router.put('/add-guest', gameController.addGuest)

module.exports = router
