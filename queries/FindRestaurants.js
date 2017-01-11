const Restaurant = require('../model/restaurant');

/**
 * Finds all restaurants in the restaurant collection.
 * @return {promise} A promise that resolves with the Restaurant that matches the id
 */
module.exports = (_id) => {
    return Restaurant.find({});
};
