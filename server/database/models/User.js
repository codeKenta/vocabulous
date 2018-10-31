const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, required: true },
  defaultLanguages: {
    lang1: { type: String, required: true },
    lang2: { type: String, required: true }
  }
});

module.exports = mongoose.model("User", userSchema.plugin(uniqueValidator));

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
