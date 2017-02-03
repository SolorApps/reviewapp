var express = require('express');
var userController = require('../controller/user');

// Create our Express router
var router = express.Router();

router.route('/register')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.loginUser);

module.exports = router;