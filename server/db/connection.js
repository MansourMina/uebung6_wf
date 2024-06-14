const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_NAME, MONGO_HOST, MONGO_PORT } =
  process.env;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`, {
  useNewUrlParser: true,
  authSource: 'admin',
  user: MONGO_USERNAME,
  pass: MONGO_PASSWORD,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

module.exports = mongoose;
