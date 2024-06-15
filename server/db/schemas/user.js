const mongoose = require('../connection');
const userSchema = new mongoose.Schema({
  company: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    postcode: { type: Number },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = { User };


