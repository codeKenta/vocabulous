const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const vocabulary = {
  user: 'USERNAME'
};

const VocabularySchema = new Schema({
  username: String,
  password: String,
  email: String,
  languagePairs: [
    {
      id: OBJECT_ID,
      owner: USERID,
      languagePair: String, // eg. sve-eng,
      words: [
        {
          id: ID,
          lang1: String,
          lang2: String,
          score: { type: Number, min: 0 }
        }
      ]
    }
  ]
});

// Kolla vart object id ska in någon stans.

module.exports = mongoose.model('Vocabulary', VocabularySchema);

const test = {
  username: 'Knetos',
  password: 'PassWordHackos2022',
  email: 'hello@osterholms.se',

  languagePairs: [
    {
      id: OBJECT_ID,
      owner: USERID,
      languagePair: 'sve-eng',
      words: [
        {
          id: 4363735753,
          lang1: 'hoppa',
          lang2: 'jump',
          score: 2
        },
        {
          id: 34355353,
          lang1: 'flyga',
          lang2: 'fly',
          score: 0
        },
        {
          id: 346356464,
          lang1: 'hiss',
          lang2: 'elevator',
          score: 10
        }
      ]
    },
    {
      id: OBJECT_ID,
      owner: USERID,
      languagePair: 'sve-ger',
      words: [
        {
          id: 4363735753,
          lang1: 'skynda',
          lang2: 'raus',
          score: 2
        },
        {
          id: 3232452,
          lang1: 'äta',
          lang2: 'esse',
          score: 0
        },
        {
          id: 346356464,
          lang1: 'jag heter',
          lang2: 'ich heisse',
          score: 3
        }
      ]
    }
  ]
};
