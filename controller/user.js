// Load required packages
var User = require('../model/user');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var secret = 'intikey';

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  // console.log("this is a post message");
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Success'});
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.registerUser = function(req, res, next){
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  user.save()
    .then((user)=>{
      console.log(user);
      var token = jwt.sign({id: user.id}, secret, {
            expiresIn: 60*5 // expires in 24 hours  now 1 min
          });
      res.json({ message: 'Success', token: token});
    })
    .catch((err)=>{
        console.log('this is a user save error');
        // console.log(err);
        return next(err);
    });
};

exports.loginUser = function(req, res, next){
  passport.authenticate('basic', { session: false }, function(err, user, info) {
    console.log("thisipn");
    if (err) return next(err);
    if (!user) {
      console.log(user);
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      var token = jwt.sign({id: user.id}, secret, {
          expiresIn: 60*5
      });
      return res.json({ token: token});
    }
  })(req, res, next);
};