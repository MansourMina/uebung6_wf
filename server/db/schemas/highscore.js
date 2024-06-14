const mongoose = require('../connection');

const highscoreSchema = new mongoose.Schema({
  score: Number,
  id: String,
});

const Highscore = mongoose.model('Highscore', highscoreSchema);
module.exports = { Highscore };

const john = new Highscore({
  score: 100,
  id: '6668d13d5b461c9f9296ad1e',
});
john
  .save()
  .then((user) => console.log(user))
  .catch((err) => console.error(err));
  