const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res, next) => {
  const newUser = new User({
    username: req.body.username.toLowerCase(),
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        msg: 'The application failed to register the user'
      });
    } else {
      console.log(user);
      res.json({ success: true, msg: 'User registration complete' });
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  console.log(req.body);

  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, '6laxarienlaxask', {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            username: user.username
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password or username' });
      }
    });
  });
});

router.post('/update-password', (req, res, next) => {
  const userId = req.body.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  User.findById(userId, (err, user) => {
    if (err) throw err;

    User.comparePassword(oldPassword, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        bcrypt.hash(newPassword, 10, (err, hash) => {
          user.password = hash;
          user.save(err => {
            if (err) throw err;
            return res.json({
              success: true,
              msg: 'Password was successfully updated'
            });
          });
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.get('/logout', (req, res, next) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

router.delete('/removeAccount', (req, res, next) => {
  const userId = req.body.userId;

  User.findOneAndDelete(userId, err => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: true, msg: 'User removed' });
    }
  });

  /* 

  ALSO REMOVE OTHER DOCUMENTS CONNECTED TO THE USER
  
  */
});

module.exports = router;
