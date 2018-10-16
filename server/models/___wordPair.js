const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const WordPairSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lang1: String,
  lang2: String,
  score: { type: Number, min: 0, default: 0 }
});

module.exports = mongoose.model('WordPair', WordPairSchema);
