const mongoose = require('../connection');

const highscoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

const Highscore = mongoose.model('Highscore', highscoreSchema);
module.exports = { Highscore };


