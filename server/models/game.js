const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gameSchema = new Schema({
  gameBoard: Array,
  scoreWhite: String,
  scoreBlack: String,
  state: String,
  isPlaying: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('game', gameSchema)
