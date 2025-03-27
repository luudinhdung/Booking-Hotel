const mongoose = require('mongoose')
const { Schema } = mongoose;

const Users = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  avatar: String,
  gender: { type: String, required: true },
});
const UserModel = mongoose.model('Users', Users);
module.exports = UserModel