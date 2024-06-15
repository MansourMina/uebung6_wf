/** in memory db */
const passwordHash = require('password-hash');
var randomToken = require('random-token');
const { Highscore } = require('../db/schemas/highscore');
const { User } = require('../db/schemas/user');

var db = {
  tokens: [],

  signup: async function (user_cred) {
    console.log(user_cred);
    let user = await User.findOne({ username: user_cred.username });
    console.log(user);

    if (user) {
      return false;
    }
    let newUser = this.newUser(user_cred);
    if (!newUser) return false;

    let credentials = {
      token: randomToken(64),
      username: newUser.username,
    };
    this.tokens.push(credentials);
    return credentials;
  },

  newUser: async function (user_cred) {
    const { company, username, password, address } = user_cred;
    const user = new User({
      company,
      username,
      password: passwordHash.generate(password),
      address,
    });
    user
      .save()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        return false;
      });
  },

  login: async function (username, password) {
    let user = await User.findOne({ username: username });
    if (user != undefined && passwordHash.verify(password, user.password)) {
      let credentials = {
        token: randomToken(64),
        username: user.username,
      };

      this.tokens.push(credentials);
      return credentials;
    }

    return null;
  },

  deleteToken(authToken) {
    this.tokens = this.tokens.filter((e) => e.token != authToken);
  },

  isAuthenticated: function (authToken) {
    return this.tokens.find((auth) => auth.token == authToken) != undefined;
  },

  getAuthUser: function (authToken) {
    return this.tokens.find((auth) => auth.token == authToken);
  },

  getHighscores: async function () {
    const highscores = await Highscore.find({});
    return highscores.sort(function (a, b) {
      return b.score - a.score;
    });
  },

  addHighscore: function (username, score) {
    const highscore = new Highscore({ username, score });
    highscore
      .save()
      .then((user) => console.log(user))
      .catch((err) => console.error(err));
  },
};

module.exports = db;
