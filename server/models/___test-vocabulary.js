const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  wordPairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WordPair' }]
});

const WordPairsSchema = new Schema({
  lang1: String,
  lang2: String,
  score: { type: Number, min: 0, default: 0 }
});

/*

Tror att bättre ide att ha tre modeler som i början.



*/

// const UserSchema = new Schema({
//   username: String,
//   password: String,
//   email: String,
//   languagePairs: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'LanguagePairs' }
//   ]
// });

// const LanguagePairsSchema = new Schema({
//   languagePair: String,
//   WordPairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WordPairs' }]
// });

// const LanguagePairsSchema2 = new Schema({
//   languagePair: String
// });

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('WordPairs', WordPairsSchema);
// module.exports = mongoose.model('LanguagePairs', LanguagePairsSchema);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// const vocabulary = {
//   user: 'USERNAME'
// };

// const VocabularySchema = new Schema({
//   username: String,
//   password: String,
//   email: String,
//   languagePairs: [
//     {
//       // owner: USERID,
//       languagePair: String, // eg. sve-eng,
//       words: [
//         {
//           lang1: String,
//           lang2: String,
//           score: { type: Number, min: 0, default: 0 }
//         }
//       ]
//     }
//   ]
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// const test = {
//   username: 'Knetos',
//   password: 'PassWordHackos2022',
//   email: 'hello@osterholms.se',

//   languagePairs: [
//     {
//       id: OBJECT_ID,
//       owner: USERID,
//       languagePair: 'sve-eng',
//       words: [
//         {
//           id: 4363735753,
//           lang1: 'hoppa',
//           lang2: 'jump',
//           score: 2
//         },
//         {
//           id: 34355353,
//           lang1: 'flyga',
//           lang2: 'fly',
//           score: 0
//         },
//         {
//           id: 346356464,
//           lang1: 'hiss',
//           lang2: 'elevator',
//           score: 10
//         }
//       ]
//     },
//     {
//       id: OBJECT_ID,
//       owner: USERID,
//       languagePair: 'sve-ger',
//       words: [
//         {
//           id: 4363735753,
//           lang1: 'skynda',
//           lang2: 'raus',
//           score: 2
//         },
//         {
//           id: 3232452,
//           lang1: 'äta',
//           lang2: 'esse',
//           score: 0
//         },
//         {
//           id: 346356464,
//           lang1: 'jag heter',
//           lang2: 'ich heisse',
//           score: 3
//         }
//       ]
//     }
//   ]
// };
