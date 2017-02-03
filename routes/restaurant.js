var express = require('express');
var authController = require('../controller/auth');
var restaurantController = require('../controller/restaurant');

// Create our Express router
var router = express.Router();

router.route('/add')
    .get(restaurantController.addDishToRestaurant);

router.route('/getRestaurants')
    .get(authController.isAuthenticatedJwt,restaurantController.getRestaurants);

module.exports = router;