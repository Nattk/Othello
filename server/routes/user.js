const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/signup', userController.postUser)
router.post('/login', userController.logUser)
router.get('/get-user/:id', userController.getUser)

module.exports = router
