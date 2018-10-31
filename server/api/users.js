const express = require("express");
const User = require("../database/models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const newUser = new User({
    username: req.body.username.toLowerCase(),
    password: req.body.password,
    defaultLanguages: {
      lang1: req.body.lang1,
      lang2: req.body.lang2
    }
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      console.log(err);
      const errMsg = {
        success: false,
        errorMsg: {
          username: err.errors.username ? "Username already exists" : null
        }
      };
      res.json(errMsg);
    } else {
      const token = signToken(user);

      token
        ? res.json(token)
        : res.json({
            success: false,
            errorMsg: "Login attemp failed. Please login manually."
          });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        errorMsg: "Wrong password or username"
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = signToken(user);
        token
          ? res.json(token)
          : res.json({
              success: false,
              errorMsg: "Something went wrong. Please login again."
            });
      } else {
        return res.json({
          success: false,
          errorMsg: "Wrong password or username"
        });
      }
    });
  });
});

router.post("/update-password", (req, res, next) => {
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
              msg: "Password was successfully updated"
            });
          });
        });
      } else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

router.get("/logout", (req, res, next) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

router.delete("/removeAccount", (req, res, next) => {
  const userId = req.body.userId;

  User.findOneAndDelete(userId, err => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: true, msg: "User removed" });
    }
  });

  /* 

  ALSO REMOVE OTHER DOCUMENTS CONNECTED TO THE USER


  ----

  -----
  
  */
});

/* Helper functions */

const signToken = user => {
  const token = jwt.sign({ data: user }, "6laxarienlaxask", {
    expiresIn: 604800
  });

  if (user._id && user.username && user.defaultLanguages) {
    return {
      success: true,
      token: "JWT " + token,
      user: {
        id: user._id,
        username: user.username,
        defaultLanguages: user.defaultLanguages
      }
    };
  } else {
    return false;
  }
};

module.exports = router;
