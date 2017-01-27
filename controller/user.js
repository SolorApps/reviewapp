// Load required packages
var User = require('../model/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var findUserByUsername = require('../queries/FindUserByUsername');
var secret = 'intikey';

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/registerUser for POST
exports.registerUser = function(req, res, next){
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  findUserByUsername(newUser.username)
  .then((user)=>{
    if(!user){
      newUser.save()
      .then((user)=>{
        var token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*5 // 60 seconds * 5
        });
        res.json({ message: 'Success', token: token});
      })
    }
    else{
      res.json({message: 'user found already'});
    }
  })
  .catch((err)=>{
    return next(err);
  })
  // newUser.save()
  //   .then((user)=>{
  //     // var token = jwt.sign({id: user.id}, secret, {
  //     //       expiresIn: 60*5 // 60 seconds * 5
  //     //     });
  //     // res.json({ message: 'Success', token: token});
  //     generateJwt(60*5);
  //   })
  //   .catch((err)=>{
  //       return next(err);
  //   });
};

exports.loginUser = function(req, res, next){
  passport.authenticate('basic', { session: false }, function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      // console.log(jwt);
      // var token = jwt.sign({id: user.id}, secret, {
      //     expiresIn: 60*5
      // });
      // return res.json({ message: 'Success', token: token});
      return generateJwt(60*5,user);
    }
  })(req, res, next);

  var generateJwt = function (secondsToExperiration,user){
    var token = jwt.sign({id: user.id}, secret, {
          expiresIn: secondsToExperiration
      });
      return res.json({ message: 'Success', token: token});
  }
};