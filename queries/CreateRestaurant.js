const Restaurant = require('../model/restaurant');

/**
 * Creates a single restaurant in the restaurant collection.
 * @param {object} restaurantProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Restaurant that was created
 */
module.exports = (restaurantProps) => {
    // console.log(artistProps);
    const restaurant = new Restaurant(restaurantProps);
    return restaurant.save();
};
