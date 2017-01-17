// Load required packages
var User = require('../model/user');
var bodyParser = require('body-parser');

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

    res.json({ message: 'New beer drinker added to the locker room!' });
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

exports.registerUser = function(req, res){
  console.log('this is a post message');
};