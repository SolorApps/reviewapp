const CreateRestaurant = require('../queries/CreateRestaurant');
const FindRestaurants = require('../queries/FindRestaurants');
const AddDishToRestaurant = require('../queries/AddDishToRestaurant');


// Create endpoint /api/restaurant for POSTS
exports.postRestaurant = function(req, res) {
  // Create a new instance of the Beer model

    // Set the restaurant properties that came from the POST data
    var restaurantProp = {
        name: req.body.name
    };
    CreateRestaurant(restaurantProp)
    .then((restaurant)=>{
        if (!restaurant.isNew){
            console.log('a restaurant was created');
            res.json(restaurant);
        }
    });  
};

exports.getRestaurants = function(req, res) {
    FindRestaurants()
    .then((restaurants)=>{ 
        res.json(restaurants);
    })
};

exports.createDefault = function(req, res) {
    CreateRestaurant({
      name: 'el restaurante'
    })
    .then((restaurants)=>{ 
        res.json(restaurants);
    })
};

exports.addDishToRestaurant = function(req, res, next) {
    // var dishProps = {
    //     name: "a new dish",
    //     rating: 0
    // };
    AddDishToRestaurant(req.query.id, req.query.name, req.query.rating)
    // res.send(req.query.id);
    // AddDishToRestaurant(req.query.id, dishProps)
    .then((restaurants)=>{ 
        res.json(restaurants);
    })
    .catch((err)=>{
        console.log('this is the error');
        // console.log(err);
        return next();
    });
};