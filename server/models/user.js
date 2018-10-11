const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  email: { type: String, unique: true, required: true, dropDups: true }
});

module.exports = mongoose.model('User', UserSchema);
