const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const WordPair = require('../models/WordPair');
const router = express.Router();

router.post('/addUser', (req, res, next) => {
  newUser = new User(req.body);
  newUser.save(err => {
    if (err) {
      res.json({ success: false, msg: 'User could not be added' });
    } else {
      res.json({ success: true, msg: 'User successfully added' });
    }
  });
});

router.put('/addWords', (req, res, next) => {});

router.delete('/deleteWords', (req, res, next) => {});

router.put('/score', (req, res, next) => {});

router.get(
  '/getWords/:numberOfWords/:userID/:lang1/:lang2',
  (req, res, next) => {
    res.json({ msg: 'HELLO!' });
  }
);

router.post('/login', (req, res, next) => {});

router.get('/logout', (req, res, next) => {});

module.exports = router;

/* Manufacture later to correct REST-pattern */
