const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String
});

module.exports = mongoose.model('user', userSchema);