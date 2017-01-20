// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user');
var findUserByUsername = require('../queries/FindUserByUsername');
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// passport.use(new BasicStrategy(
//     function(username, password, callback) {
//     console.log(username);
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return callback(err); }

//       // No user found with that username
//       if (!user) { return callback(null, false); }

//       // Make sure the password is correct
//       user.verifyPassword(password, function(err, isMatch) {
//         console.log('vsdfadaf');
//         if (err) { return callback(err); }

//         // Password did not match
//         if (!isMatch) { return callback(null, false); }

//         // Success
//         return callback(null, user);
//       });
//     });
//   }
// ));
passport.use(new BasicStrategy(
    function(username, password, callback) {
    findUserByUsername(username)
    .then((user)=>{
      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        console.log('vsdfadaf');
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    })
    .catch((err)=>{
        console.log('this is a BasicStrategy err');
        return next(err);
    });
  }
));

exports.isAuthenticatedBasic = passport.authenticate('basic', { session : false });

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'intikey';

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = User.findById(jwt_payload.id, function(err, user){
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });    
  }
));

exports.isAuthenticatedJwt = passport.authenticate('jwt', { session: false });


exports.userExist = function(req, res, next) {
    User.count({
        email: req.body.email
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            res.redirect("/signup");
        }
    });
}