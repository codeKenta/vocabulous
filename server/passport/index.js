const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../database/models/User');

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'voco-lobo-lishi-lushioux';

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.data._id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

// const passport = require('passport');
// const LocalStrategy = require('./localStrategy');
// const User = require('../database/models/User');

// passport.serializeUser((user, done) => {
//   done(null, { _id: user._id });
// });

// passport.deserializeUser((id, done) => {
//   User.findOne({ _id: id }, 'username', (err, user) => {
//     done(null, user);
//   });
// });

// //  Use Strategies
// passport.use(LocalStrategy);

// module.exports = passport;
