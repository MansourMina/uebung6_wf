const mongoose = require('../connection');
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  address: Object,
});

const User = mongoose.model('User', userSchema);
module.exports = { User };

const john = new User({
  name: 'John',
  username: 'john@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
});
john
  .save()
  .then((user) => console.log(user))
  .catch((err) => console.error(err));
