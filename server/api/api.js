const express = require('express');
const _ = require('lodash');
const LanguagePair = require('../database/models/LanguagePair');
const router = express.Router();

const done = (err, response) => {
  if (err) {
    console.log(err);
    response.status(500).json({ error: true });
  } else {
    response.json({
      success: true
    });
  }
};

router.post('/addWords', (req, res, next) => {
  const newWordPair = {
    lang1: req.body.lang1Word,
    lang2: req.body.lang2Word
  };

  // Try to update a language pair eg. eng-sve by pushing a new word pair into it.
  LanguagePair.updateOne(
    {
      owner: req.body.ownerId,
      $or: [
        { lang1Prefix: req.body.lang1, lang2Prefix: req.body.lang2 },
        { lang2Prefix: req.body.lang2, lang1Prefix: req.body.lang1 }
      ]
    },
    {
      $push: {
        wordList: newWordPair
      }
    },
    (err, count) => {
      if (err) return next(err);
      if (count.n > 0) {
        done(err, res);
      } else {
        // New language pair will be created with the new words inside of it if the language pair did not exist before.
        const newLanguagePair = new LanguagePair({
          owner: req.body.ownerId,
          lang1Prefix: req.body.lang1,
          lang2Prefix: req.body.lang2,
          wordList: [
            {
              lang1: req.body.lang1Word,
              lang2: req.body.lang2Word
            }
          ]
        });
        newLanguagePair.save(done(err, res));
      }
    }
  );
});

router.put('/score', (req, res, next) => {
  LanguagePair.updateOne(
    {
      'wordList._id': req.body.wordPairId
    },
    {
      $inc: {
        'wordList.$.score': 1
      }
    },
    (err, count) => {
      if (err) return next(err);
      if (count.n > 0) {
        done(err, res);
      }
    }
  );
});

router.post('/getWords', (req, res, next) => {
  let maxScore = 10;
  let numberOfWords = 10;
  if (req.body.maxScore) {
    maxScore = req.body.maxScore;
  }
  if (req.body.numberOfWords) {
    numberOfWords = req.body.numberOfWords;
  }

  LanguagePair.findById(req.body.languagePairId)
    .select('wordList')
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      const wordList = result.wordList.filter(words => words.score < maxScore);

      const shuffleWordList = _.shuffle(wordList);

      let finalWordList = shuffleWordList;

      if (shuffleWordList.length > numberOfWords - 1) {
        finalWordList = shuffleWordList.slice(0, numberOfWords - 1);
      }
      res.json(finalWordList);
    });
});

router.post('/getLists/', (req, res, next) => {
  console.log(req.body.ownerId);
  LanguagePair.find({})
    .where({ owner: req.body.ownerId })
    .select('wordList lang1Prefix lang2Prefix')
    .exec((err, result) => {
      if (err) {
        return next(err);
      }

      const formatedData = result.map(langPair => {
        return {
          languagePairId: langPair._id,
          lang1: langPair.lang1Prefix,
          lang2: langPair.lang2Prefix,
          listLength: langPair.wordList.length
        };
      });

      res.json(formatedData);
    });
});

router.delete('/deleteWords', (req, res, next) => {
  LanguagePair.updateMany(
    {},
    { $pull: { wordList: { _id: req.body.wordPairId } } },
    { multi: true },
    (err, data) => {
      if (err || data.nModified < 1) {
        return res.status(500).json({ error: true });
      }
      res.json(data);
    }
  );
});

router.delete('/deleteList', (req, res, next) => {
  LanguagePair.findByIdAndRemove(req.body.languagePairId, (err, result) => {
    if (err || result === null) {
      return res.status(500).json({ error: true });
    }
    res.json({
      success: true
    });
  });
});

module.exports = router;
