const CreateRestaurant = require('../queries/CreateRestaurant');
const FindRestaurants = require('../queries/FindRestaurants');

// Create endpoint /api/restaurant for POSTS
exports.postRestaurant = function(req, res) {
  // Create a new instance of the Beer model

    // Set the restaurant properties that came from the POST data
    var restaurantProp = {
        name:'el restaurant'
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


  Beer.find(function(err, beers) {
    if (err)
      res.send(err);

    res.json(beers);
  });
};